const API_URL = 'http://localhost:3000/api';

const categories = {
    casa: {
        title: 'Casa',
        icon: 'fa-home',
        tasks: [],
        stats: {
            'Tareas completadas': '0/0',
            'Próximo deber': 'Sin tareas',
            'Nivel orden': '0%'
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