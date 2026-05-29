AOS.init({duration:800,once:true});

particlesJS('particles-js',{
    particles:{
        number:{value:70},
        color:{value:'#00f2ff'},
        shape:{type:'circle'},
        opacity:{value:.28},
        size:{value:2},
        line_linked:{enable:true,distance:135,color:'#00f2ff',opacity:.13,width:1},
        move:{enable:true,speed:1}
    }
});

const projects={
    maderera:{
        title:'Empresa Maderera',
        intro:'Web para vender y panel privado que facilita la gestión diaria: ventas, productos, personal, consultas y control del negocio en tiempo real.',
        tech:['PHP','MySQL','JavaScript','HTML','CSS','Panel Administrativo','Diseño Responsive'],
        functions:['Tienda web para mostrar servicios','Panel privado para administrar','Gestión de clientes y productos','Ventas y consultas web','Asistencia de trabajadores','Datos visibles en tiempo real'],
        benefits:['Menos trabajo manual','Más orden en el negocio','Mejor atención al cliente','Control desde un solo lugar','Ideal para madereras, ferreterías, mercados y tiendas locales'],
        images:['assets/panel-maderera.png','logo.png'],
        link:'https://serviciosgeneralesivam.com/'
    },
    tiendita:{
        title:'La Tiendita de las Mil Cosas',
        intro:'Tienda online pensada para un negocio local que quiere mostrar productos, ofertas, categorías y vender de forma más simple.',
        tech:['HTML','CSS','JavaScript','PHP','Diseño Responsive','Carrito de Compras'],
        functions:['Categorías de productos','Buscador','Ofertas visibles','Carrito de compras','Detalle de producto','Mensaje de bienvenida y promociones'],
        benefits:['El cliente entiende rápido qué comprar','Funciona para jóvenes y adultos','Sirve para bazares, regalos, disfraces, tecnología, juguetes o tiendas pequeñas','Ayuda a vender sin explicar todo por WhatsApp'],
        images:['assets/tiendita-modal.png','favicon.png'],
        link:'https://latienditadelasmilcosas.serviciosgeneralesivam.com/'
    },
    hmc:{
        title:'Panel Logístico HMC',
        intro:'Sistema interno para organizar órdenes y contratos. Reemplaza archivos sueltos por una plataforma más clara y rápida.',
        tech:['PHP','MySQL','JavaScript','HTML','CSS','Exportación a Excel'],
        functions:['Registro de órdenes','Control de contratos','Tablas administrativas','Edición de datos','Verificación final','Reporte en Excel'],
        benefits:['Evita pérdida de información','Ahorra tiempo administrativo','Ordena procesos internos','Permite revisar datos rápido','Útil para empresas, hospitales y áreas logísticas'],
        images:['assets/panel-hmc.png','hmc.png'],
        link:''
    },
    labarca:{
        title:'La Barca Restobar & Grill',
        intro:'Sitio web para restaurante en Chiclayo. Muestra la marca, carta, ambiente, galería, horarios, reservas, Instagram y WhatsApp en una experiencia elegante y fácil de navegar.',
        tech:['HTML','CSS','JavaScript','Diseño Responsive','Video de Fondo','Galería','PDF de Carta'],
        functions:['Página principal con presentación clara','Sección de carta y platos','Galería del local','Botones a Instagram y WhatsApp','Reserva rápida','Diseño adaptable a celular y computadora'],
        benefits:['El restaurante se ve más profesional','El cliente encuentra rápido la carta y la reserva','Mejora la confianza antes de visitar','Sirve para promocionar platos, ambiente y horarios','Ideal para restaurantes, cafeterías, bares y negocios de comida'],
        images:['assets/labarca-web.png','assets/labarca-logo.png'],
        link:'proyectos/labarca/index.html'
    },
    veterinaria:{
        title:'Mis Peluditos Veterinaria',
        intro:'Sistema veterinario creado para registrar pacientes, dueños, citas, exámenes e historial de cada mascota.',
        tech:['PHP','MySQL','JavaScript','HTML','CSS','Panel de Gestión'],
        functions:['Registro de dueños','Registro de mascotas','Citas veterinarias','Exámenes','Historial clínico','Seguimiento y observaciones'],
        benefits:['Atención más ordenada','Historial siempre disponible','Menos papeles y menos confusión','Fácil para recepcionistas y veterinarios','Ideal para veterinarias pequeñas o clínicas en crecimiento'],
        images:['assets/veterinaria.png','assets/peluditos-logo.png'],
        link:''
    }
};

const modal=document.getElementById('modal');
const modalBody=document.getElementById('modalBody');
const closeModal=document.getElementById('closeModal');

function list(items){
    return items.map(item=>`<li>${item}</li>`).join('');
}

function openModal(key){
    const p=projects[key];
    modalBody.innerHTML=`
        <div class="modal-head">
            <h2>${p.title}</h2>
            <p>${p.intro}</p>
            ${p.link?`<a class="modal-link" href="${p.link}" target="_blank">Abrir Proyecto</a>`:''}
        </div>
        <div class="modal-grid">
            <div class="modal-block"><h3>Tecnologías</h3><ul>${list(p.tech)}</ul></div>
            <div class="modal-block"><h3>Qué Hace</h3><ul>${list(p.functions)}</ul></div>
            <div class="modal-block"><h3>Beneficios</h3><ul>${list(p.benefits)}</ul></div>
            <div class="modal-block"><h3>Para Quién Sirve</h3><ul><li>Negocios locales</li><li>Emprendedores</li><li>Estudiantes</li><li>Empresas que quieren ordenarse</li><li>Personas que no dominan la tecnología</li></ul></div>
            <div class="modal-images">${p.images.map(img=>`<img src="${img}" alt="${p.title}">`).join('')}</div>
        </div>
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
}

function hideModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach(button=>{
    button.addEventListener('click',()=>openModal(button.dataset.project));
});

closeModal.addEventListener('click',hideModal);
modal.addEventListener('click',event=>{
    if(event.target===modal) hideModal();
});
document.addEventListener('keydown',event=>{
    if(event.key==='Escape') hideModal();
});
