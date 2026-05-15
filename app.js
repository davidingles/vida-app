const API_URL = 'http://localhost:3000/api';

// Controlador de theme día/noche
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme === 'light' ? 'light' : '');
    localStorage.setItem('theme', newTheme);
    
    themeToggle.querySelector('i').className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
});

// Controlador de documentos
const docToggle = document.getElementById('docToggle');
const docModal = document.getElementById('docModal');
const closeDocModal = document.getElementById('closeDocModal');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const docCategory = document.getElementById('docCategory');
const btnUpload = document.getElementById('btnUpload');
const docListContainer = document.getElementById('docListContainer');

let selectedFile = null;

docToggle.addEventListener('click', () => {
    docModal.classList.add('active');
    loadDocuments();
});

closeDocModal.addEventListener('click', () => {
    docModal.classList.remove('active');
});

docModal.addEventListener('click', (e) => {
    if (e.target === docModal) {
        docModal.classList.remove('active');
    }
});

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--accent)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(233, 69, 96, 0.4)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(233, 69, 96, 0.4)';
    if (e.dataTransfer.files.length) {
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    selectedFile = file;
    uploadArea.innerHTML = `<i class="fas fa-file"></i><p>${file.name}</p>`;
    updateUploadButton();
}

docCategory.addEventListener('change', updateUploadButton);

function updateUploadButton() {
    btnUpload.disabled = !selectedFile || !docCategory.value;
}

btnUpload.addEventListener('click', async () => {
    if (!selectedFile || !docCategory.value) return;
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('category', docCategory.value);
    
    btnUpload.disabled = true;
    btnUpload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
    
    try {
        const response = await fetch(`${API_URL}/documents`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            selectedFile = null;
            fileInput.value = '';
            docCategory.value = '';
            uploadArea.innerHTML = '<i class="fas fa-cloud-upload-alt"></i><p>Haz clic o arrastra un archivo aquí</p>';
            loadDocuments();
            btnUpload.innerHTML = '<i class="fas fa-upload"></i> Subir documento';
        } else {
            alert('Error al subir el documento');
            btnUpload.disabled = false;
            btnUpload.innerHTML = '<i class="fas fa-upload"></i> Subir documento';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al subir el documento');
        btnUpload.disabled = false;
        btnUpload.innerHTML = '<i class="fas fa-upload"></i> Subir documento';
    }
});

async function loadDocuments() {
    try {
        const response = await fetch(`${API_URL}/documents`);
        const docs = await response.json();
        
        if (docs.length === 0) {
            docListContainer.innerHTML = '<p style="color: var(--text-dim); text-align: center;">No hay documentos subidos</p>';
            return;
        }
        
        docListContainer.innerHTML = docs.map(doc => `
            <div class="doc-item">
                <div class="doc-icon">
                    <i class="fas fa-file-${getFileIcon(doc.mimetype)}"></i>
                </div>
                <div class="doc-info">
                    <div class="doc-name">${doc.originalname}</div>
                    <div class="doc-date">${new Date(doc.created_at).toLocaleDateString()}</div>
                </div>
                <div class="doc-actions">
                    <a class="btn-download" href="${doc.file_path}" download="${doc.originalname}" title="Descargar">
                        <i class="fas fa-download"></i>
                    </a>
                    <button onclick="deleteDoc(${doc.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading documents:', error);
    }
}

function getFileIcon(mimetype) {
    if (mimetype.includes('pdf')) return 'pdf';
    if (mimetype.includes('image')) return 'image';
    if (mimetype.includes('word') || mimetype.includes('document')) return 'word';
    if (mimetype.includes('sheet') || mimetype.includes('excel')) return 'excel';
    return 'alt';
}

window.downloadDoc = async function(id) {
    try {
        const response = await fetch(`${API_URL}/documents/${id}/download`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading:', error);
    }
};

window.deleteDoc = async function(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este documento?')) return;
    
    try {
        await fetch(`${API_URL}/documents/${id}`, { method: 'DELETE' });
        loadDocuments();
    } catch (error) {
        console.error('Error deleting:', error);
    }
};

const categories = {
    casa: {
        title: 'Casa',
        icon: 'fa-home',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Próximo deber': 'Sin tareas',
            'Nivel orden': '0%'
        },
        houseInfo: {
            contractFile: null,
            address: 'Calle Ficticia 123, Madrid',
            price: '850€/mes',
            owner: {
                name: 'Juan Pérez',
                phone: '612 345 678'
            },
            agency: {
                name: 'Inmobiliaria XYZ',
                phone: '910 123 456'
            },
            utilities: {
                light: { contract: 'Contrato activo', file: null },
                water: { contract: 'Contrato activo', file: null },
                internet: { contract: 'Fibra 300Mbps', file: null }
            }
        }
    },
    vehiculo: {
        title: 'Vehículos',
        icon: 'fa-car',
        tabs: true,
        coche: {
            title: 'Coche',
            icon: 'fa-car',
            tasks: [],
            stats: {
                'Tareas completadas': '0/0',
                'Próximo deber': 'Sin tareas',
                'Nivel mantenimiento': '0%'
            }
        },
        mot: {
            title: 'Moto',
            icon: 'fa-motorcycle',
            tasks: [],
            stats: {
                'Tareas completadas': '0/0',
                'Próximo deber': 'Sin tareas',
                'Nivel mantenimiento': '0%'
            }
        }
    },
    trabajo: {
        title: 'Trabajo',
        icon: 'fa-briefcase',
        tabs: true,
        devs: {
            title: 'Devs',
            icon: 'fa-code',
            tasks: [],
            stats: {
                'Tareas completadas': '0/0',
                'Último commit': 'Sin datos',
                'Productividad': '0%'
            }
        },
        portero: {
            title: 'Portero',
            icon: 'fa-door-open',
            tasks: [],
            stats: {
                'Tareas completadas': '0/0',
                'Último turno': 'Sin datos',
                'Eficiencia': '0%'
            }
        },
        auxiliar: {
            title: 'Auxiliar',
            icon: 'fa-hands-helping',
            tasks: [],
            stats: {
                'Tareas completadas': '0/0',
                'Ayudas realizadas': '0',
                'Satisfacción': '0%'
            }
        }
    },
    religion: {
        title: 'Religión',
        icon: 'fa-pray',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Última actividad': 'Sin datos',
            'Nivel fe': '0%'
        }
    },
    gimnasio: {
        title: 'Gimnasio',
        icon: 'fa-dumbbell',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Último treino': 'Sin datos',
            'Progreso': '0%'
        }
    },
    familia: {
        title: 'Familia',
        icon: 'fa-users',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Último encuentro': 'Sin datos',
            'Conexión familiar': '0%'
        }
    },
    bancos: {
        title: 'Bancos',
        icon: 'fa-university',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Próximo pago': 'Sin datos',
            'Salud financiera': '0%'
        }
    },
    devs: {
        title: 'Devs',
        icon: 'fa-code',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Último commit': 'Sin datos',
            'Productividad': '0%'
        }
    }
};

let currentCategory = null;
let currentSubcategory = null;

const panelTitle = document.getElementById('panelTitle');
const panelIcon = document.getElementById('panelIcon');
const panelContent = document.getElementById('panelContent');
const contentPanel = document.getElementById('contentPanel');
const addTaskForm = document.getElementById('addTaskForm');
const newTaskInput = document.getElementById('newTaskInput');

addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = newTaskInput.value.trim();
    if (text && currentCategory) {
        await saveTask(currentCategory, currentSubcategory, text);
        newTaskInput.value = '';
    }
});

document.querySelectorAll('.life-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        currentSubcategory = null;
        showPanel(category);
    });
});

function showPanel(category) {
    currentCategory = category;
    const data = categories[category];
    
    panelTitle.textContent = data.title;
    panelIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;

    if (data.tabs) {
        const tabKeys = Object.keys(data).filter(k => k !== 'title' && k !== 'icon' && k !== 'tabs');
        
        let tabsHTML = '<div class="tabs-container">' + tabKeys.map((key, index) => `
            <button class="tab-btn ${index === 0 ? 'active' : ''}" data-tab="${key}">
                <i class="fas ${data[key].icon}"></i> ${data[key].title}
            </button>
        `).join('') + '</div>';
        
        let tabsContent = '';
        let firstTab = true;
        
        Object.keys(data).forEach(key => {
            if (key !== 'title' && key !== 'icon' && key !== 'tabs') {
                const tabData = data[key];
                const isActive = firstTab ? 'active' : '';
                firstTab = false;
                
                const tasksHTML = tabData.tasks.map(task => `
                    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                            <i class="fas fa-check"></i>
                        </div>
                        <span class="task-text">${task.text}</span>
                        <button class="task-delete" onclick="deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');

                const statsHTML = `
                    <div class="stats-section">
                        <h3><i class="fas fa-chart-line"></i> Estadísticas</h3>
                        ${Object.entries(tabData.stats).map(([label, value]) => `
                            <div class="stat-row">
                                <span class="stat-label">${label}</span>
                                <span class="stat-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                `;

                tabsContent += `
                    <div class="tab-content ${isActive}" data-tab="${key}">
                        ${tasksHTML + statsHTML}
                        <button class="more-info-btn" onclick="openInfoPage('${category}', '${key}')">
                            <i class="fas fa-plus"></i> MÁS INFO
                        </button>
                    </div>
                `;
            }
        });

        panelContent.innerHTML = tabsHTML + tabsContent;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.querySelector(`.tab-content[data-tab="${btn.dataset.tab}"]`).classList.add('active');
                currentSubcategory = btn.dataset.tab;
            });
        });
    } else if (category === 'casa' && data.houseInfo) {
        const house = data.houseInfo;
        
        let houseInfoHTML = `
            <div class="house-info-section">
                <h3><i class="fas fa-file-signature"></i> Contrato de Alquiler</h3>
                <div class="contract-row">
                    <span class="contract-label">${house.contractFile ? house.contractFile.name : 'Sin archivo'}</span>
                    <button class="upload-btn" onclick="document.getElementById('contractFileInput').click()">
                        <i class="fas fa-upload"></i> Subir
                    </button>
                    <input type="file" id="contractFileInput" style="display:none" accept="*/*" onchange="handleContractUpload(this)">
                </div>
            </div>
            
            <div class="house-info-section">
                <h3><i class="fas fa-home"></i> Datos de la Casa</h3>
                <div class="house-detail">
                    <span class="house-detail-label">Dirección</span>
                    <span class="house-detail-value">${house.address}</span>
                </div>
                <div class="house-detail">
                    <span class="house-detail-label">Precio</span>
                    <span class="house-detail-value">${house.price}</span>
                </div>
            </div>
            
            <div class="house-info-section">
                <h3><i class="fas fa-user"></i> Propietario</h3>
                <div class="house-detail">
                    <span class="house-detail-label">Nombre</span>
                    <span class="house-detail-value">${house.owner.name}</span>
                </div>
                <div class="house-detail">
                    <span class="house-detail-label">Teléfono</span>
                    <span class="house-detail-value">${house.owner.phone}</span>
                </div>
            </div>
            
            <div class="house-info-section">
                <h3><i class="fas fa-building"></i> Inmobiliaria</h3>
                <div class="house-detail">
                    <span class="house-detail-label">Nombre</span>
                    <span class="house-detail-value">${house.agency.name}</span>
                </div>
                <div class="house-detail">
                    <span class="house-detail-label">Teléfono</span>
                    <span class="house-detail-value">${house.agency.phone}</span>
                </div>
            </div>
            
            <div class="house-info-section">
                <h3><i class="fas fa-plug"></i> Servicios</h3>
                
                <div class="utility-section">
                    <h4><i class="fas fa-bolt"></i> Luz</h4>
                    <div class="utility-item">
                        <span class="utility-name">
                            <i class="fas fa-file-contract"></i> ${house.utilities.light.contract}
                        </span>
                        <button class="upload-btn" onclick="document.getElementById('lightFileInput').click()">
                            <i class="fas fa-upload"></i> Subir
                        </button>
                        <input type="file" id="lightFileInput" style="display:none" accept="*/*" onchange="handleUtilityUpload('light', this)">
                    </div>
                </div>
                
                <div class="utility-section">
                    <h4><i class="fas fa-tint"></i> Agua</h4>
                    <div class="utility-item">
                        <span class="utility-name">
                            <i class="fas fa-file-contract"></i> ${house.utilities.water.contract}
                        </span>
                        <button class="upload-btn" onclick="document.getElementById('waterFileInput').click()">
                            <i class="fas fa-upload"></i> Subir
                        </button>
                        <input type="file" id="waterFileInput" style="display:none" accept="*/*" onchange="handleUtilityUpload('water', this)">
                    </div>
                </div>
                
                <div class="utility-section">
                    <h4><i class="fas fa-wifi"></i> Internet</h4>
                    <div class="utility-item">
                        <span class="utility-name">
                            <i class="fas fa-file-contract"></i> ${house.utilities.internet.contract}
                        </span>
                        <button class="upload-btn" onclick="document.getElementById('internetFileInput').click()">
                            <i class="fas fa-upload"></i> Subir
                        </button>
                        <input type="file" id="internetFileInput" style="display:none" accept="*/*" onchange="handleUtilityUpload('internet', this)">
                    </div>
                </div>
            </div>
        `;
        
        panelContent.innerHTML = houseInfoHTML;
    } else {
        let tasksHTML = data.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                    <i class="fas fa-check"></i>
                </div>
                <span class="task-text">${task.text}</span>
                <button class="task-delete" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        let statsHTML = `
            <div class="stats-section">
                <h3><i class="fas fa-chart-line"></i> Estadísticas</h3>
                ${Object.entries(data.stats).map(([label, value]) => `
                    <div class="stat-row">
                        <span class="stat-label">${label}</span>
                        <span class="stat-value">${value}</span>
                    </div>
                `).join('')}
            </div>
        `;

        panelContent.innerHTML = tasksHTML + statsHTML + `
            <button class="more-info-btn" onclick="openInfoPage('${category}')">
                <i class="fas fa-plus"></i> MÁS INFO
            </button>
        `;
    }

    panelContent.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', () => toggleTask(item.dataset.id));
    });

    contentPanel.scrollIntoView({ behavior: 'smooth' });
}

function toggleTask(taskId) {
    const data = categories[currentCategory];
    let task = null;
    
    if (data.tabs) {
        Object.keys(data).forEach(key => {
            if (key !== 'title' && key !== 'icon' && key !== 'tabs') {
                const found = data[key].tasks.find(t => t.id === taskId);
                if (found) task = found;
            }
        });
    } else {
        task = data.tasks.find(t => t.id === taskId);
    }
    
    if (task) {
        task.completed = !task.completed;
        showPanel(currentCategory);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllData();
    showPanel('casa');
});

async function loadAllData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        Object.keys(categories).forEach(category => {
            const catData = categories[category];
            if (catData.tabs) {
                Object.keys(catData).forEach(subKey => {
                    if (subKey !== 'title' && subKey !== 'icon' && subKey !== 'tabs') {
                        const subCat = catData[subKey];
                        subCat.tasks = data
                            .filter(t => t.category === category && t.subcategory === subKey)
                            .map(t => ({ id: t.id, text: t.text, completed: t.completed === 1 }));
                        updateStats(subCat);
                    }
                });
            } else {
                catData.tasks = data
                    .filter(t => t.category === category)
                    .map(t => ({ id: t.id, text: t.text, completed: t.completed === 1 }));
                updateStats(catData);
            }
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function updateStats(data) {
    const total = data.tasks.length;
    const completed = data.tasks.filter(t => t.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const statsKeys = Object.keys(data.stats);
    data.stats[statsKeys[0]] = `${completed}/${total}`;
    data.stats[statsKeys[2]] = `${percentage}%`;
    
    const pending = data.tasks.find(t => !t.completed);
    if (pending) {
        data.stats[statsKeys[1]] = pending.text.substring(0, 20);
    }
}

async function saveTask(category, subcategory, text) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, subcategory, text })
        });
        await loadAllData();
        if (currentCategory) showPanel(currentCategory);
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

async function toggleTask(taskId) {
    const data = categories[currentCategory];
    let task = null;
    
    if (data.tabs && currentSubcategory) {
        const found = data[currentSubcategory].tasks.find(t => t.id === taskId);
        if (found) task = found;
    } else if (!data.tabs) {
        task = data.tasks.find(t => t.id === taskId);
    }
    
    if (task) {
        task.completed = !task.completed;
        try {
            await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: task.completed })
            });
            showPanel(currentCategory);
        } catch (error) {
            console.error('Error updating task:', error);
            task.completed = !task.completed;
        }
    }
}

async function deleteTask(taskId) {
    try {
        await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
        await loadAllData();
        if (currentCategory) showPanel(currentCategory);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function openInfoPage(category, subcategory = null) {
    const params = new URLSearchParams();
    params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    window.location.href = 'info.html?' + params.toString();
}

/**
 * Maneja la subida del contrato de alquiler.
 * @param {HTMLInputElement} input - Elemento input de archivo
 */
function handleContractUpload(input) {
    if (input.files.length) {
        const file = input.files[0];
        categories.casa.houseInfo.contractFile = file;
        showPanel('casa');
    }
}

/**
 * Maneja la subida de documentos de servicios (luz, agua, internet).
 * @param {string} type - Tipo de servicio ('light', 'water', 'internet')
 * @param {HTMLInputElement} input - Elemento input de archivo
 */
function handleUtilityUpload(type, input) {
    if (input.files.length) {
        const file = input.files[0];
        categories.casa.houseInfo.utilities[type].file = file;
        showPanel('casa');
    }
}