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
        tasks: [
            { id: 'v1', text: 'Cambiar aceite', completed: false },
            { id: 'v2', text: 'Lavar el coche', completed: true },
            { id: 'v3', text: 'Revisar neumáticos', completed: false },
            { id: 'v4', text: '票据 de la moto', completed: false },
            { id: 'v5', text: 'Cambiar filtro aire', completed: false }
        ],
        stats: {
            'Tareas completadas': '1/5',
            'Próximo deber': 'Cambiar aceite',
            'Nivel mantenimiento': '60%'
        }
    },
    trabajo: {
        title: 'Trabajo',
        icon: 'fa-briefcase',
        tasks: [
            { id: 't1', text: 'Reunión de equipo', completed: true },
            { id: 't2', text: 'Entregar proyecto', completed: false },
            { id: 't3', text: 'Actualizar CV', completed: false },
            { id: 't4', text: 'Aprender nueva habilidad', completed: true },
            { id: 't5', text: 'Networking', completed: false }
        ],
        stats: {
            'Tareas completadas': '2/5',
            'Próximo deber': 'Entregar proyecto',
            'Productividad': '85%'
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

    panelContent.innerHTML = tasksHTML + statsHTML;

    panelContent.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', () => toggleTask(item.dataset.id));
    });

    contentPanel.scrollIntoView({ behavior: 'smooth' });
}

function toggleTask(taskId) {
    const category = categories[currentCategory];
    const task = category.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        showPanel(currentCategory);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showPanel('casa');
});