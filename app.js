const categories = {
    casa: {
        title: 'Casa',
        icon: 'fa-home',
        tasks: [
            { id: 'c1', text: 'Limpiar la casa', completed: false },
            { id: 'c2', text: 'Comprar groceries', completed: true },
            { id: 'c3', text: 'Pagar servicios', completed: false },
            { id: 'c4', text: 'Mantenimiento general', completed: false },
            { id: 'c5', text: 'Organizar armario', completed: true }
        ],
        stats: {
            'Tareas completadas': '2/5',
            'Próximo deber': 'Limpiar casa',
            'Nivel orden': '75%'
        }
    },
    vehiculo: {
        title: 'Vehículos',
        icon: 'fa-car',
        tabs: true,
        coche: {
            title: 'Coche',
            icon: 'fa-car',
            tasks: [
                { id: 'vc1', text: 'Cambiar aceite', completed: false },
                { id: 'vc2', text: 'Lavar el coche', completed: true },
                { id: 'vc3', text: 'Revisar neumáticos', completed: false },
                { id: 'vc4', text: 'Cambiar filtro aire', completed: false },
                { id: 'vc5', text: 'Revisarfren os', completed: false }
            ],
            stats: {
                'Tareas completadas': '1/5',
                'Próximo deber': 'Cambiar aceite',
                'Nivel mantenimiento': '60%'
            }
        },
        mot: {
            title: 'Moto',
            icon: 'fa-motorcycle',
            tasks: [
                { id: 'vm1', text: 'Cambiar aceite moto', completed: false },
                { id: 'vm2', text: 'Lavar la moto', completed: true },
                { id: 'vm3', text: 'Revisar cadena', completed: false },
                { id: 'vm4', text: '票据 de la moto', completed: false },
                { id: 'vm5', text: 'Revisar neumáticos', completed: false }
            ],
            stats: {
                'Tareas completadas': '1/5',
                'Próximo deber': 'Cambiar aceite',
                'Nivel mantenimiento': '50%'
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
            tasks: [
                { id: 'td1', text: 'Commit código', completed: true },
                { id: 'td2', text: 'Revisar PRs', completed: false },
                { id: 'td3', text: 'Actualizar dependencias', completed: true },
                { id: 'td4', text: 'Hacer backup', completed: false },
                { id: 'td5', text: 'Aprender nueva tecnología', completed: false }
            ],
            stats: {
                'Tareas completadas': '2/5',
                'Último commit': 'Hoy',
                'Productividad': '65%'
            }
        },
        portero: {
            title: 'Portero',
            icon: 'fa-door-open',
            tasks: [
                { id: 'tp1', text: 'Limpiar entrada', completed: true },
                { id: 'tp2', text: 'Revisar cerraduras', completed: false },
                { id: 'tp3', text: 'Controlar acceso', completed: true },
                { id: 'tp4', text: 'Registrar visitas', completed: false },
                { id: 'tp5', text: 'Mantener秩序', completed: false }
            ],
            stats: {
                'Tareas completadas': '2/5',
                'Último turno': 'Hoy',
                'Eficiencia': '70%'
            }
        },
        auxiliar: {
            title: 'Auxiliar',
            icon: 'fa-hands-helping',
            tasks: [
                { id: 'ta1', text: 'Ayudar vecinos', completed: true },
                { id: 'ta2', text: 'Entregar correspondencia', completed: false },
                { id: 'ta3', text: 'Reportar incidencias', completed: true },
                { id: 'ta4', text: 'Gestionar reparaciones', completed: false },
                { id: 'ta5', text: 'Coordinar servicios', completed: false }
            ],
            stats: {
                'Tareas completadas': '2/5',
                'Ayudas realizadas': '5',
                'Satisfacción': '80%'
            }
        }
    },
    religion: {
        title: 'Religión',
        icon: 'fa-pray',
        tasks: [
            { id: 'r1', text: 'Oración matutina', completed: true },
            { id: 'r2', text: 'Leer la biblia', completed: true },
            { id: 'r3', text: 'Asistir a misa', completed: true },
            { id: 'r4', text: 'Meditación espiritual', completed: false },
            { id: 'r5', text: 'Ayunar', completed: false }
        ],
        stats: {
            'Tareas completadas': '3/5',
            'Última actividad': 'Misa domingo',
            'Nivel fe': '90%'
        }
    },
    gimnasio: {
        title: 'Gimnasio',
        icon: 'fa-dumbbell',
        tasks: [
            { id: 'g1', text: 'Entreno de pecho', completed: true },
            { id: 'g2', text: 'Cardio 30 min', completed: false },
            { id: 'g3', text: 'Estiramientos', completed: false },
            { id: 'g4', text: 'Tomar proteínas', completed: true },
            { id: 'g5', text: 'Entreno de piernas', completed: false }
        ],
        stats: {
            'Tareas completadas': '2/5',
            'Último treino': 'Pecho',
            'Progreso': '45%'
        }
    },
    familia: {
        title: 'Familia',
        icon: 'fa-users',
        tasks: [
            { id: 'f1', text: 'Llamar a los padres', completed: true },
            { id: 'f2', text: 'Visitar a los abuelos', completed: false },
            { id: 'f3', text: 'Cenar en familia', completed: true },
            { id: 'f4', text: 'Organizar reunión familiar', completed: false },
            { id: 'f5', text: 'Regalar presente', completed: false }
        ],
        stats: {
            'Tareas completadas': '2/5',
            'Último encuentro': 'Cena familiar',
            'Conexión familiar': '80%'
        }
    },
    bancos: {
        title: 'Bancos',
        icon: 'fa-university',
        tasks: [
            { id: 'b1', text: 'Revisar cuenta', completed: true },
            { id: 'b2', text: 'Pagar tarjeta', completed: false },
            { id: 'b3', text: 'Transferencia', completed: true },
            { id: 'b4', text: 'Invertir dinero', completed: false },
            { id: 'b5', text: 'Actualizar app banco', completed: false }
        ],
        stats: {
            'Tareas completadas': '2/5',
            'Próximo pago': 'Tarjeta crédito',
            'Salud financiera': '70%'
        }
    },
    devs: {
        title: 'Devs',
        icon: 'fa-code',
        tasks: [
            { id: 'd1', text: 'Commit código', completed: true },
            { id: 'd2', text: 'Revisar PRs', completed: false },
            { id: 'd3', text: 'Actualizar dependencias', completed: true },
            { id: 'd4', text: 'Hacer backup', completed: false },
            { id: 'd5', text: 'Aprender nueva tecnología', completed: false }
        ],
        stats: {
            'Tareas completadas': '2/5',
            'Último commit': 'Hoy',
            'Productividad': '65%'
        }
    }
};

let currentCategory = null;

const panelTitle = document.getElementById('panelTitle');
const panelIcon = document.getElementById('panelIcon');
const panelContent = document.getElementById('panelContent');
const contentPanel = document.getElementById('contentPanel');

document.querySelectorAll('.life-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
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
            });
        });
    } else {
        let tasksHTML = data.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                    <i class="fas fa-check"></i>
                </div>
                <span class="task-text">${task.text}</span>
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

document.addEventListener('DOMContentLoaded', () => {
    showPanel('casa');
});

function openInfoPage(category, subcategory = null) {
    const params = new URLSearchParams();
    params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    window.location.href = 'info.html?' + params.toString();
}