/* ==========================================================================
   VendorLens AI - Enterprise SaaS Dashboard JavaScript
   Features: Live Clock, Counter Animations, Circular Risk Progress, 
   Sidebar Collapse, Theme Persistence, Real-time Table Filter, Dropdowns,
   Interactive Modals, Toast System, and Ripple Effects.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. LIVE DATE & TIME CLOCK WIDGET
       -------------------------------------------------------------------------- */
    function updateLiveClock() {
        const liveDateEl = document.getElementById('liveDate');
        const liveTimeEl = document.getElementById('liveTime');
        
        if (!liveDateEl || !liveTimeEl) return;

        const now = new Date();
        
        // Format Date: e.g. "Tue, 21 Jul 2026"
        const optionsDate = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-GB', optionsDate);
        
        // Format Time: e.g. "17:16:38 IST"
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeZone = 'IST'; // Default enterprise time display

        liveDateEl.textContent = formattedDate;
        liveTimeEl.textContent = `${hours}:${minutes}:${seconds} ${timeZone}`;
    }

    updateLiveClock();
    setInterval(updateLiveClock, 1000);


    /* --------------------------------------------------------------------------
       2. ANIMATED COUNTERS FOR SUMMARY CARDS
       -------------------------------------------------------------------------- */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1600; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // EaseOutQuad formula for smooth deceleration
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentValue = Math.floor(easeProgress * target);

                counter.textContent = currentValue.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + suffix;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    animateCounters();


    /* --------------------------------------------------------------------------
       3. SIDEBAR TOGGLE & MOBILE SLIDE DRAWER
       -------------------------------------------------------------------------- */
    const sidebar = document.getElementById('sidebar');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Save state to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('vendorlens_sidebar_collapsed', isCollapsed);
        });
    }

    // Restore sidebar state
    if (localStorage.getItem('vendorlens_sidebar_collapsed') === 'true') {
        sidebar?.classList.add('collapsed');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
        });
    }

    // Close mobile sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('mobile-open')) {
            if (!sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });


    /* --------------------------------------------------------------------------
       4. DARK / LIGHT MODE THEME SWITCHER
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('vendorlens_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('vendorlens_theme', newTheme);

            showToast(`Switched to ${newTheme.toUpperCase()} theme mode`, 'info');
        });
    }


    /* --------------------------------------------------------------------------
       5. DROPDOWN PANELS (NOTIFICATIONS & USER PROFILE)
       -------------------------------------------------------------------------- */
    const notifBellBtn = document.getElementById('notifBellBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const profileMenuBtn = document.getElementById('profileMenuBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notifBadge = document.getElementById('notifBadge');

    function closeAllDropdowns() {
        notifDropdown?.classList.remove('show');
        profileDropdown?.classList.remove('show');
    }

    if (notifBellBtn) {
        notifBellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = notifDropdown.classList.contains('show');
            closeAllDropdowns();
            if (!isOpen) notifDropdown.classList.add('show');
        });
    }

    if (profileMenuBtn) {
        profileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileDropdown.classList.contains('show');
            closeAllDropdowns();
            if (!isOpen) profileDropdown.classList.add('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-wrapper')) {
            closeAllDropdowns();
        }
    });

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            const unreadItems = document.querySelectorAll('.notif-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
            if (notifBadge) {
                notifBadge.style.display = 'none';
            }
            showToast('All notifications marked as read', 'success');
        });
    }


    /* --------------------------------------------------------------------------
       6. CIRCULAR RISK PROGRESS CHART ANIMATION
       -------------------------------------------------------------------------- */
    function initCircularRiskChart() {
        const circleProgress = document.getElementById('riskCircleProgress');
        const percentageText = document.getElementById('riskPercentageText');
        
        if (!circleProgress) return;

        const targetPercent = 72; // Composite Risk Score
        let currentPercent = 0;
        const duration = 1500;
        const startTime = performance.now();

        function animateRing(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            currentPercent = Math.floor(easeProgress * targetPercent);
            
            // stroke-dasharray="val, 100"
            circleProgress.setAttribute('stroke-dasharray', `${currentPercent}, 100`);
            if (percentageText) percentageText.textContent = `${currentPercent}%`;

            if (progress < 1) {
                requestAnimationFrame(animateRing);
            }
        }

        requestAnimationFrame(animateRing);
    }

    initCircularRiskChart();


    /* --------------------------------------------------------------------------
       7. RECENT VENDORS TABLE FILTERING & SEARCH
       -------------------------------------------------------------------------- */
    const tableFilterInput = document.getElementById('tableFilterInput');
    const statusFilterSelect = document.getElementById('statusFilterSelect');
    const vendorsTableBody = document.getElementById('vendorsTableBody');

    function filterVendorsTable() {
        if (!vendorsTableBody) return;

        const searchTerm = (tableFilterInput?.value || '').toLowerCase().trim();
        const selectedStatus = statusFilterSelect?.value || 'all';
        const rows = vendorsTableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const vendorName = row.querySelector('.vendor-name')?.textContent.toLowerCase() || '';
            const category = row.children[1]?.textContent.toLowerCase() || '';
            const country = row.children[2]?.textContent.toLowerCase() || '';
            const statusText = row.children[4]?.textContent.trim() || '';

            const matchesSearch = vendorName.includes(searchTerm) || category.includes(searchTerm) || country.includes(searchTerm);
            let matchesStatus = true;

            if (selectedStatus === 'Approved') {
                matchesStatus = statusText.includes('Low Risk') || statusText.includes('Approved');
            } else if (selectedStatus === 'In Review') {
                matchesStatus = statusText.includes('In Review');
            } else if (selectedStatus === 'High Risk') {
                matchesStatus = statusText.includes('High Risk');
            }

            if (matchesSearch && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    tableFilterInput?.addEventListener('input', filterVendorsTable);
    statusFilterSelect?.addEventListener('change', filterVendorsTable);


    /* --------------------------------------------------------------------------
       8. GLOBAL KEYBOARD SHORTCUT (CTRL + K / CMD + K)
       -------------------------------------------------------------------------- */
    const globalSearchInput = document.getElementById('globalSearchInput');

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            globalSearchInput?.focus();
            showToast('Global AI Search Activated', 'info');
        }
    });


    /* --------------------------------------------------------------------------
       9. MODAL DIALOG CONTROLLERS & ACTIONS
       -------------------------------------------------------------------------- */
    const addVendorModal = document.getElementById('addVendorModal');
    const uploadContractModal = document.getElementById('uploadContractModal');
    const aiScanModal = document.getElementById('aiScanModal');

    // Action Triggers
    document.getElementById('btnAddVendor')?.addEventListener('click', () => openModal(addVendorModal));
    document.getElementById('btnUploadContract')?.addEventListener('click', () => openModal(uploadContractModal));
    document.getElementById('btnRunAnalysis')?.addEventListener('click', triggerBatchAiScan);
    document.getElementById('btnGenerateReport')?.addEventListener('click', () => {
        showToast('Generating Comprehensive AI Procurement Audit PDF...', 'info');
        setTimeout(() => showToast('AI Risk Dossier Downloaded Successfully!', 'success'), 2000);
    });
    document.getElementById('btnExportData')?.addEventListener('click', () => {
        showToast('Exporting Vendor Intelligence Dataset (CSV/JSON)...', 'info');
        setTimeout(() => showToast('Dataset Export Complete!', 'success'), 1500);
    });

    // Close Modal Event Listeners
    document.getElementById('closeAddVendorModal')?.addEventListener('click', () => closeModal(addVendorModal));
    document.getElementById('cancelAddVendor')?.addEventListener('click', () => closeModal(addVendorModal));
    document.getElementById('closeUploadModal')?.addEventListener('click', () => closeModal(uploadContractModal));

    function openModal(modal) {
        if (modal) modal.classList.add('show');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('show');
    }

    // Add Vendor Form Submission
    const addVendorForm = document.getElementById('addVendorForm');
    addVendorForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('inputVendorName').value;
        const category = document.getElementById('inputVendorCategory').value;
        const country = document.getElementById('inputVendorCountry').value;
        const status = document.getElementById('inputVendorStatus').value;

        // Append to Recent Vendors Table
        if (vendorsTableBody) {
            const newRow = document.createElement('tr');
            
            let statusBadgeHtml = '';
            let scorePillHtml = '';

            if (status === 'Approved') {
                statusBadgeHtml = `<span class="badge-status status-approved"><i class="fa-solid fa-circle"></i> Low Risk</span>`;
                scorePillHtml = `<div class="risk-score-pill score-green"><span class="score-num">20%</span><div class="mini-score-bar"><span style="width:20%;"></span></div></div>`;
            } else if (status === 'In Review') {
                statusBadgeHtml = `<span class="badge-status status-review"><i class="fa-solid fa-circle"></i> In Review</span>`;
                scorePillHtml = `<div class="risk-score-pill score-amber"><span class="score-num">55%</span><div class="mini-score-bar"><span style="width:55%;"></span></div></div>`;
            } else {
                statusBadgeHtml = `<span class="badge-status status-flagged"><i class="fa-solid fa-circle"></i> High Risk</span>`;
                scorePillHtml = `<div class="risk-score-pill score-red"><span class="score-num">88%</span><div class="mini-score-bar"><span style="width:88%;"></span></div></div>`;
            }

            const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'VN';

            newRow.innerHTML = `
                <td>
                    <div class="vendor-cell">
                        <div class="vendor-avatar bg-blue">${initials}</div>
                        <div>
                            <span class="vendor-name">${escapeHtml(name)}</span>
                            <span class="vendor-id">ID: VND-${Math.floor(1000 + Math.random() * 9000)}</span>
                        </div>
                    </div>
                </td>
                <td>${escapeHtml(category)}</td>
                <td><span class="flag-icon">🌐</span> ${escapeHtml(country)}</td>
                <td>${scorePillHtml}</td>
                <td>${statusBadgeHtml}</td>
                <td class="text-muted">Just now</td>
                <td>
                    <button class="action-icon-btn view-btn" title="View AI Report" onclick="openVendorDetails('${escapeHtml(name)}')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </td>
            `;

            vendorsTableBody.prepend(newRow);
        }

        closeModal(addVendorModal);
        addVendorForm.reset();
        showToast(`Vendor '${name}' onboarded & AI risk scan initialized!`, 'success');
    });

    // File Drag & Drop Simulation
    const dragArea = document.getElementById('dragArea');
    const fileInput = document.getElementById('fileInput');
    const uploadProgressBox = document.getElementById('uploadProgressBox');
    const uploadProgressBar = document.getElementById('uploadProgressBar');
    const uploadPercentDisplay = document.getElementById('uploadPercentDisplay');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    function handleFileUpload() {
        const file = fileInput.files[0];
        if (!file) return;

        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
        if (uploadProgressBox) uploadProgressBox.style.display = 'block';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 15;
            if (uploadProgressBar) uploadProgressBar.style.width = `${progress}%`;
            if (uploadPercentDisplay) uploadPercentDisplay.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    closeModal(uploadContractModal);
                    uploadProgressBox.style.display = 'none';
                    showToast(`Contract '${file.name}' uploaded & parsed by AI NLP!`, 'success');
                }, 500);
            }
        }, 150);
    }

    // AI Batch Scan Simulation
    function triggerBatchAiScan() {
        openModal(aiScanModal);
        const bar = document.getElementById('aiScanProgressBar');
        const text = document.getElementById('aiScanStatusText');

        const steps = [
            { pct: 25, msg: 'Initializing Neural Risk Models...' },
            { pct: 55, msg: 'Evaluating Financial Statements & SEC Filings...' },
            { pct: 85, msg: 'Auditing ISO Compliance & Cybersecurity Vulnerabilities...' },
            { pct: 100, msg: 'Analysis Complete! Updating Dashboard Index...' }
        ];

        let idx = 0;
        const timer = setInterval(() => {
            if (idx < steps.length) {
                if (bar) bar.style.width = `${steps[idx].pct}%`;
                if (text) text.textContent = steps[idx].msg;
                idx++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    closeModal(aiScanModal);
                    showToast('AI Risk Analysis completed for all 1,428 vendors!', 'success');
                }, 600);
            }
        }, 700);
    }


    /* --------------------------------------------------------------------------
       10. BUTTON RIPPLE EFFECT
       -------------------------------------------------------------------------- */
    document.querySelectorAll('.action-btn, .btn-primary-glow, .logout-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });


    /* --------------------------------------------------------------------------
       11. TOAST NOTIFICATION SYSTEM
       -------------------------------------------------------------------------- */
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast-message ${type}`;

        let iconClass = 'fa-solid fa-circle-info';
        if (type === 'success') iconClass = 'fa-solid fa-circle-check';
        if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';

        toast.innerHTML = `<i class="${iconClass}"></i> <span>${escapeHtml(message)}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Helper functions exported to global scope for inline onclicks
    window.openVendorDetails = function(name) {
        showToast(`Opening AI Risk Dossier for: ${name}`, 'info');
    };

    window.renewContractModal = function(id, name) {
        showToast(`Initiating automated AI renewal for contract ${id} (${name})`, 'info');
    };

    window.triggerAiAction = function(msg) {
        showToast(`Executing AI Action: ${msg}`, 'info');
    };

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function(m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        });
    }

});
