export type Lang = 'en' | 'es';

type Dict = Record<string, string>;

/**
 * Flat translation dictionaries. Keys are dot-namespaced by section.
 * `t(key, vars)` interpolates `{placeholder}` tokens.
 */
const en: Dict = {
  // Brand
  'brand.name': 'Lumi Dental Clinic',
  'brand.short': 'Lumi Dental',
  'brand.sub': 'Dental Clinic',

  // Common
  'common.bookAppointment': 'Book Appointment',
  'common.book': 'Book',
  'common.continue': 'Continue',
  'common.back': 'Back',
  'common.backToHome': 'Back to home',
  'common.backToWebsite': 'Back to website',

  // Language toggle
  'lang.label': 'Language',
  'lang.toSpanish': 'Cambiar a español',
  'lang.toEnglish': 'Switch to English',

  // Nav
  'nav.services': 'Services',
  'nav.doctors': 'Doctors',
  'nav.results': 'Results',
  'nav.contact': 'Contact',
  'nav.staff': 'Staff',
  'nav.staffDashboard': 'Staff Dashboard',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.skip': 'Skip to content',

  // Hero
  'hero.badge': 'Gentle dentistry, brilliant smiles',
  'hero.titlePrefix': 'Your brightest, healthiest ',
  'hero.titleHighlight': 'smile',
  'hero.titleSuffix': ' starts here.',
  'hero.subtitle':
    '{clinic} pairs modern, painless treatments with a calm, caring team led by Dr. Charu Gandhi. Book online in under a minute.',
  'hero.explore': 'Explore services',
  'hero.reviews': '1,200+ reviews',
  'hero.trustedValue': '18+ yrs',
  'hero.trusted': 'trusted care',
  'hero.toothAlt': 'Glossy, healthy tooth — the Lumi Dental emblem',
  'hero.toothLabel': 'Interactive 3D model of a glossy tooth',

  // Trust strip
  'trust.smilesValue': '15,000+',
  'trust.smiles': 'Smiles brightened',
  'trust.specialistsValue': '8',
  'trust.specialists': 'Specialist dentists',
  'trust.sameDayValue': 'Same-day',
  'trust.emergency': 'Emergency slots',
  'trust.painlessValue': '99%',
  'trust.painless': 'Painless visits',
  'trust.highlights': 'Clinic highlights',

  // Services
  'services.eyebrow': 'What we do',
  'services.title': 'Comprehensive care for every smile',
  'services.desc':
    'From routine check-ups to full smile makeovers, our specialists cover it all under one calm, modern roof.',
  'services.meta': '{mins} min · from ${price}',
  'services.cleaning.name': 'Cleaning & Hygiene',
  'services.cleaning.desc':
    'Professional scaling, polishing and a fluoride finish for a fresh, healthy smile.',
  'services.whitening.name': 'Teeth Whitening',
  'services.whitening.desc':
    'Safe, dentist-supervised whitening that lifts stains several shades in one visit.',
  'services.implants.name': 'Dental Implants',
  'services.implants.desc':
    'Permanent titanium implants that look, feel and function like natural teeth.',
  'services.braces.name': 'Braces & Aligners',
  'services.braces.desc':
    'Clear aligners and modern braces to gently straighten teeth at any age.',
  'services.rootCanal.name': 'Root Canal',
  'services.rootCanal.desc':
    'Gentle, virtually painless endodontic care to save and restore damaged teeth.',
  'services.pediatric.name': 'Pediatric Dentistry',
  'services.pediatric.desc':
    'Friendly, reassuring care that helps little ones build lifelong healthy habits.',

  // Team
  'team.eyebrow': 'Meet the team',
  'team.title': "Specialists you'll feel at ease with",
  'team.desc':
    'A friendly, highly-qualified team — each a specialist in their field, all committed to gentle, honest care.',
  'team.yearsExp': '{n} yrs experience',
  'team.bookWith': 'Book with {name}',
  'doctors.charu.specialty': 'Lead Dentist · Cosmetic & Implantology',
  'doctors.charu.bio':
    'Founder of Lumi Dental. Dr. Gandhi blends meticulous cosmetic work with a calm, reassuring chair-side manner patients trust.',
  'doctors.rohan.specialty': 'Orthodontist · Braces & Aligners',
  'doctors.rohan.bio':
    'Aligner specialist who has guided thousands of teens and adults to confident, straighter smiles.',
  'doctors.aisha.specialty': 'Endodontist · Root Canal Therapy',
  'doctors.aisha.bio':
    'Known for gentle, near-painless root canals using the latest rotary endodontic techniques.',
  'doctors.leo.specialty': 'Pediatric Dentist',
  'doctors.leo.bio':
    'Makes every young visitor feel at ease, turning first dental visits into happy memories.',

  // Testimonials
  'testimonials.eyebrow': "Smiles we're proud of",
  'testimonials.title': 'Real results, happy patients',
  'testimonials.desc':
    'See a sample transformation and hear from the people who trust us with their smiles.',
  'testimonials.before': 'Before',
  'testimonials.after': 'After',
  'testimonials.sliderLabel': 'Drag to compare before and after treatment',
  'testimonials.sliderValue': 'After image revealed {pos}%',
  'testimonials.sliderCaption':
    'Real-style smile transformation — drag or use arrow keys to compare.',
  'reviews.1.role': 'Whitening patient',
  'reviews.1.quote':
    'I was so nervous, but the team made it completely painless. My teeth are several shades brighter and I keep smiling!',
  'reviews.2.role': 'Implant patient',
  'reviews.2.quote':
    'Dr. Gandhi explained every step. The implant feels exactly like a real tooth — best decision I have made.',
  'reviews.3.role': 'Family check-ups',
  'reviews.3.quote':
    'My children actually look forward to the dentist now. Warm, gentle and genuinely caring with little ones.',

  // CTA
  'cta.title': 'Ready for a healthier, brighter smile?',
  'cta.desc':
    "Book online in under a minute, or call us and we'll find a time that works for you.",

  // Footer
  'footer.tagline': 'Gentle, modern dentistry for the whole family.',
  'footer.visit': 'Visit us',
  'footer.hours': 'Opening hours',
  'footer.quickLinks': 'Quick links',
  'footer.ql.services': 'Our services',
  'footer.ql.team': 'Meet the dentists',
  'footer.ql.book': 'Book an appointment',
  'footer.ql.dashboard': 'Staff dashboard',
  'footer.rights': '© {year} {clinic}. All rights reserved.',
  'footer.demo': 'Built as a demo · placeholder content, swap in real assets anytime.',
  'hours.mf.day': 'Monday – Friday',
  'hours.mf.time': '9:00 AM – 6:00 PM',
  'hours.sat.day': 'Saturday',
  'hours.sat.time': '9:00 AM – 2:00 PM',
  'hours.sun.day': 'Sunday',
  'hours.sun.time': 'Closed',

  // Booking page
  'booking.eyebrow': 'Online booking',
  'booking.title': 'Book your appointment',
  'booking.desc':
    "Four quick steps. Choose a treatment, your preferred dentist, a time that suits you, and you're done.",

  // Wizard
  'wizard.step.service': 'Service',
  'wizard.step.dentist': 'Dentist',
  'wizard.step.datetime': 'Date & time',
  'wizard.step.details': 'Details',
  'wizard.step.done': 'Done',
  'wizard.progress': 'Booking progress',
  'wizard.confirm': 'Confirm booking',
  'wizard.slotTaken':
    'Sorry — that slot was just taken. Please go back and choose another time.',
  'wizard.error': 'Something went wrong while booking. Please try again.',
  'step.service.title': 'Which treatment do you need?',
  'step.dentist.title': 'Choose your dentist',
  'step.datetime.title': 'Pick a date & time',
  'datetime.available': 'Available times',
  'datetime.selectDate': 'Select a date to see open slots.',
  'datetime.unavailable': 'Sundays & past dates unavailable.',
  'datetime.prevMonth': 'Previous month',
  'datetime.nextMonth': 'Next month',
  'datetime.booked': 'Already booked',
  'details.title': 'Your details',
  'details.name': 'Full name',
  'details.phone': 'Phone',
  'details.email': 'Email',
  'details.notes': 'Notes (optional)',
  'details.notesPlaceholder':
    'Anything we should know — anxieties, symptoms, accessibility needs…',
  'details.notesHint': "We'll review this before your visit.",

  // Validation
  'err.nameRequired': 'Please enter your full name.',
  'err.nameShort': 'Name looks too short.',
  'err.emailRequired': 'Please enter your email.',
  'err.emailInvalid': 'That email address looks invalid.',
  'err.phoneRequired': 'Please enter a contact number.',
  'err.phoneInvalid': 'That phone number looks invalid.',

  // Confirmation
  'conf.title': "You're booked in! 🎉",
  'conf.subtitle':
    "Thanks, {name}. We've reserved your slot and sent a confirmation to {email}.",
  'conf.summary': 'Booking summary',
  'conf.pending': 'Pending confirmation',
  'conf.treatment': 'Treatment',
  'conf.dentist': 'Dentist',
  'conf.date': 'Date',
  'conf.time': 'Time',
  'conf.reference': 'Reference',
  'conf.bookAnother': 'Book another',

  // Login
  'login.title': 'Staff sign in',
  'login.subtitle': 'Access the Lumi Dental clinic dashboard.',
  'login.email': 'Work email',
  'login.password': 'Password',
  'login.error': 'Please enter both an email and a password.',
  'login.signIn': 'Sign in',
  'login.demoLabel': 'Demo only:',
  'login.demoText':
    'this is a mock gate — any email and password will sign you in. No real authentication is performed.',

  // Dashboard
  'dash.overview': 'Clinic overview',
  'dash.welcome': "Welcome back — here's what's happening at Lumi Dental today.",
  'dash.todays': "Today's appointments",
  'dash.thisWeek': 'This week',
  'dash.totalPatients': 'Total patients',
  'dash.completed': 'Completed visits',
  'dash.weekChart': 'Appointments this week',
  'dash.total': '{n} total',
  'dash.appointments': 'Appointments',
  'dash.shown': '{n} shown',
  'dash.title': 'Dashboard',
  'table.date': 'Date',
  'table.time': 'Time',
  'table.patient': 'Patient',
  'table.service': 'Service',
  'table.dentist': 'Dentist',
  'table.status': 'Status',
  'table.actions': 'Actions',
  'table.empty': 'No appointments match these filters.',
  'action.confirm': 'Confirm',
  'action.complete': 'Complete',
  'action.cancel': 'Cancel',
  'action.aria': '{action} appointment for {name}',
  'filter.status': 'Status',
  'filter.allStatuses': 'All statuses',
  'filter.date': 'Date',
  'filter.clear': 'Clear filters',
  'status.pending': 'Pending',
  'status.confirmed': 'Confirmed',
  'status.completed': 'Completed',
  'status.cancelled': 'Cancelled',
  'side.overview': 'Overview',
  'side.appointments': 'Appointments',
  'side.patients': 'Patients',
  'side.dentists': 'Dentists',
  'side.settings': 'Settings',
  'side.soon': 'Soon',
  'side.signedIn': 'Signed in',
  'side.signOut': 'Sign out',
  'side.closeNav': 'Close navigation',
  'side.openNav': 'Open navigation',

  // Not found
  'nf.title': 'Page not found',
  'nf.desc':
    "We couldn't find that page. It may have moved, or the link might be incorrect.",

  // Calendar / chart day labels (comma-separated, Sunday first)
  'cal.weekdaysShort': 'Su,Mo,Tu,We,Th,Fr,Sa',
  'chart.daysShort': 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
};

const es: Dict = {
  // Brand
  'brand.name': 'Lumi Dental Clinic',
  'brand.short': 'Lumi Dental',
  'brand.sub': 'Clínica Dental',

  // Common
  'common.bookAppointment': 'Reservar cita',
  'common.book': 'Reservar',
  'common.continue': 'Continuar',
  'common.back': 'Atrás',
  'common.backToHome': 'Volver al inicio',
  'common.backToWebsite': 'Volver al sitio',

  // Language toggle
  'lang.label': 'Idioma',
  'lang.toSpanish': 'Cambiar a español',
  'lang.toEnglish': 'Switch to English',

  // Nav
  'nav.services': 'Servicios',
  'nav.doctors': 'Doctores',
  'nav.results': 'Resultados',
  'nav.contact': 'Contacto',
  'nav.staff': 'Personal',
  'nav.staffDashboard': 'Panel del personal',
  'nav.openMenu': 'Abrir menú',
  'nav.closeMenu': 'Cerrar menú',
  'nav.skip': 'Saltar al contenido',

  // Hero
  'hero.badge': 'Odontología suave, sonrisas brillantes',
  'hero.titlePrefix': 'Tu sonrisa más ',
  'hero.titleHighlight': 'radiante',
  'hero.titleSuffix': ' y sana empieza aquí.',
  'hero.subtitle':
    '{clinic} combina tratamientos modernos e indoloros con un equipo atento y tranquilo, liderado por la Dra. Charu Gandhi. Reserva en línea en menos de un minuto.',
  'hero.explore': 'Ver servicios',
  'hero.reviews': '+1.200 reseñas',
  'hero.trustedValue': '+18 años',
  'hero.trusted': 'de confianza',
  'hero.toothAlt': 'Diente sano y brillante — el emblema de Lumi Dental',
  'hero.toothLabel': 'Modelo 3D interactivo de un diente brillante',

  // Trust strip
  'trust.smilesValue': '+15.000',
  'trust.smiles': 'Sonrisas mejoradas',
  'trust.specialistsValue': '8',
  'trust.specialists': 'Dentistas especialistas',
  'trust.sameDayValue': 'El mismo día',
  'trust.emergency': 'Citas de urgencia',
  'trust.painlessValue': '99%',
  'trust.painless': 'Visitas sin dolor',
  'trust.highlights': 'Aspectos destacados de la clínica',

  // Services
  'services.eyebrow': 'Qué hacemos',
  'services.title': 'Atención integral para cada sonrisa',
  'services.desc':
    'Desde revisiones de rutina hasta diseños de sonrisa completos, nuestros especialistas lo cubren todo bajo un mismo techo moderno y tranquilo.',
  'services.meta': '{mins} min · desde ${price}',
  'services.cleaning.name': 'Limpieza e higiene',
  'services.cleaning.desc':
    'Limpieza profesional, pulido y aplicación de flúor para una sonrisa fresca y sana.',
  'services.whitening.name': 'Blanqueamiento dental',
  'services.whitening.desc':
    'Blanqueamiento seguro y supervisado por dentistas que aclara varios tonos en una sola visita.',
  'services.implants.name': 'Implantes dentales',
  'services.implants.desc':
    'Implantes de titanio permanentes que lucen, se sienten y funcionan como dientes naturales.',
  'services.braces.name': 'Ortodoncia y alineadores',
  'services.braces.desc':
    'Alineadores transparentes y ortodoncia moderna para enderezar los dientes a cualquier edad.',
  'services.rootCanal.name': 'Endodoncia',
  'services.rootCanal.desc':
    'Tratamiento de conducto suave y casi indoloro para salvar y restaurar dientes dañados.',
  'services.pediatric.name': 'Odontopediatría',
  'services.pediatric.desc':
    'Atención amable y tranquilizadora que ayuda a los más pequeños a crear hábitos saludables de por vida.',

  // Team
  'team.eyebrow': 'Conoce al equipo',
  'team.title': 'Especialistas con quienes te sentirás a gusto',
  'team.desc':
    'Un equipo amable y altamente cualificado, cada uno especialista en su campo y comprometido con una atención honesta y delicada.',
  'team.yearsExp': '{n} años de experiencia',
  'team.bookWith': 'Reservar con {name}',
  'doctors.charu.specialty': 'Dentista principal · Estética e implantología',
  'doctors.charu.bio':
    'Fundadora de Lumi Dental. La Dra. Gandhi combina un trabajo estético meticuloso con un trato cercano y tranquilizador en el que los pacientes confían.',
  'doctors.rohan.specialty': 'Ortodoncista · Ortodoncia y alineadores',
  'doctors.rohan.bio':
    'Especialista en alineadores que ha guiado a miles de adolescentes y adultos hacia sonrisas más rectas y seguras.',
  'doctors.aisha.specialty': 'Endodoncista · Tratamiento de conductos',
  'doctors.aisha.bio':
    'Conocida por endodoncias suaves y casi indoloras con las últimas técnicas de endodoncia rotatoria.',
  'doctors.leo.specialty': 'Odontopediatra',
  'doctors.leo.bio':
    'Hace que cada pequeño visitante se sienta cómodo, convirtiendo las primeras visitas al dentista en recuerdos felices.',

  // Testimonials
  'testimonials.eyebrow': 'Sonrisas de las que estamos orgullosos',
  'testimonials.title': 'Resultados reales, pacientes felices',
  'testimonials.desc':
    'Mira una transformación de ejemplo y escucha a quienes nos confían su sonrisa.',
  'testimonials.before': 'Antes',
  'testimonials.after': 'Después',
  'testimonials.sliderLabel': 'Arrastra para comparar el antes y el después',
  'testimonials.sliderValue': "Imagen 'después' revelada al {pos}%",
  'testimonials.sliderCaption':
    'Transformación de sonrisa de ejemplo: arrastra o usa las flechas para comparar.',
  'reviews.1.role': 'Paciente de blanqueamiento',
  'reviews.1.quote':
    'Estaba muy nerviosa, pero el equipo lo hizo totalmente indoloro. ¡Mis dientes están varios tonos más blancos y no paro de sonreír!',
  'reviews.2.role': 'Paciente de implantes',
  'reviews.2.quote':
    'La Dra. Gandhi me explicó cada paso. El implante se siente igual que un diente real: la mejor decisión que he tomado.',
  'reviews.3.role': 'Revisiones familiares',
  'reviews.3.quote':
    'Ahora mis hijos esperan con ganas ir al dentista. Cálidos, suaves y de verdad atentos con los pequeños.',

  // CTA
  'cta.title': '¿Listo para una sonrisa más sana y brillante?',
  'cta.desc':
    'Reserva en línea en menos de un minuto, o llámanos y encontraremos un horario que te convenga.',

  // Footer
  'footer.tagline': 'Odontología moderna y delicada para toda la familia.',
  'footer.visit': 'Visítanos',
  'footer.hours': 'Horario',
  'footer.quickLinks': 'Enlaces rápidos',
  'footer.ql.services': 'Nuestros servicios',
  'footer.ql.team': 'Conoce a los dentistas',
  'footer.ql.book': 'Reservar una cita',
  'footer.ql.dashboard': 'Panel del personal',
  'footer.rights': '© {year} {clinic}. Todos los derechos reservados.',
  'footer.demo':
    'Hecho como demo · contenido de ejemplo, reemplazable por activos reales cuando quieras.',
  'hours.mf.day': 'Lunes a viernes',
  'hours.mf.time': '9:00 – 18:00',
  'hours.sat.day': 'Sábado',
  'hours.sat.time': '9:00 – 14:00',
  'hours.sun.day': 'Domingo',
  'hours.sun.time': 'Cerrado',

  // Booking page
  'booking.eyebrow': 'Reserva en línea',
  'booking.title': 'Reserva tu cita',
  'booking.desc':
    'Cuatro pasos rápidos. Elige un tratamiento, tu dentista preferido, un horario que te convenga y listo.',

  // Wizard
  'wizard.step.service': 'Servicio',
  'wizard.step.dentist': 'Dentista',
  'wizard.step.datetime': 'Fecha y hora',
  'wizard.step.details': 'Datos',
  'wizard.step.done': 'Listo',
  'wizard.progress': 'Progreso de la reserva',
  'wizard.confirm': 'Confirmar reserva',
  'wizard.slotTaken':
    'Lo sentimos, ese horario acaba de ocuparse. Vuelve atrás y elige otra hora.',
  'wizard.error': 'Algo salió mal al reservar. Inténtalo de nuevo.',
  'step.service.title': '¿Qué tratamiento necesitas?',
  'step.dentist.title': 'Elige tu dentista',
  'step.datetime.title': 'Elige fecha y hora',
  'datetime.available': 'Horarios disponibles',
  'datetime.selectDate': 'Selecciona una fecha para ver los horarios disponibles.',
  'datetime.unavailable': 'Domingos y fechas pasadas no disponibles.',
  'datetime.prevMonth': 'Mes anterior',
  'datetime.nextMonth': 'Mes siguiente',
  'datetime.booked': 'Ya reservado',
  'details.title': 'Tus datos',
  'details.name': 'Nombre completo',
  'details.phone': 'Teléfono',
  'details.email': 'Correo electrónico',
  'details.notes': 'Notas (opcional)',
  'details.notesPlaceholder':
    'Algo que debamos saber: miedos, síntomas, necesidades de accesibilidad…',
  'details.notesHint': 'Lo revisaremos antes de tu visita.',

  // Validation
  'err.nameRequired': 'Introduce tu nombre completo.',
  'err.nameShort': 'El nombre parece demasiado corto.',
  'err.emailRequired': 'Introduce tu correo electrónico.',
  'err.emailInvalid': 'Ese correo electrónico no parece válido.',
  'err.phoneRequired': 'Introduce un número de contacto.',
  'err.phoneInvalid': 'Ese número de teléfono no parece válido.',

  // Confirmation
  'conf.title': '¡Tu cita está reservada! 🎉',
  'conf.subtitle':
    'Gracias, {name}. Hemos reservado tu cita y enviado una confirmación a {email}.',
  'conf.summary': 'Resumen de la reserva',
  'conf.pending': 'Pendiente de confirmación',
  'conf.treatment': 'Tratamiento',
  'conf.dentist': 'Dentista',
  'conf.date': 'Fecha',
  'conf.time': 'Hora',
  'conf.reference': 'Referencia',
  'conf.bookAnother': 'Reservar otra',

  // Login
  'login.title': 'Acceso del personal',
  'login.subtitle': 'Accede al panel de la clínica Lumi Dental.',
  'login.email': 'Correo de trabajo',
  'login.password': 'Contraseña',
  'login.error': 'Introduce un correo electrónico y una contraseña.',
  'login.signIn': 'Iniciar sesión',
  'login.demoLabel': 'Solo demo:',
  'login.demoText':
    'esta es una puerta simulada: cualquier correo y contraseña te dará acceso. No se realiza ninguna autenticación real.',

  // Dashboard
  'dash.overview': 'Resumen de la clínica',
  'dash.welcome': 'Bienvenido de nuevo: esto es lo que ocurre hoy en Lumi Dental.',
  'dash.todays': 'Citas de hoy',
  'dash.thisWeek': 'Esta semana',
  'dash.totalPatients': 'Pacientes totales',
  'dash.completed': 'Visitas completadas',
  'dash.weekChart': 'Citas esta semana',
  'dash.total': '{n} en total',
  'dash.appointments': 'Citas',
  'dash.shown': '{n} mostradas',
  'dash.title': 'Panel',
  'table.date': 'Fecha',
  'table.time': 'Hora',
  'table.patient': 'Paciente',
  'table.service': 'Servicio',
  'table.dentist': 'Dentista',
  'table.status': 'Estado',
  'table.actions': 'Acciones',
  'table.empty': 'Ninguna cita coincide con estos filtros.',
  'action.confirm': 'Confirmar',
  'action.complete': 'Completar',
  'action.cancel': 'Cancelar',
  'action.aria': '{action} la cita de {name}',
  'filter.status': 'Estado',
  'filter.allStatuses': 'Todos los estados',
  'filter.date': 'Fecha',
  'filter.clear': 'Limpiar filtros',
  'status.pending': 'Pendiente',
  'status.confirmed': 'Confirmada',
  'status.completed': 'Completada',
  'status.cancelled': 'Cancelada',
  'side.overview': 'Resumen',
  'side.appointments': 'Citas',
  'side.patients': 'Pacientes',
  'side.dentists': 'Dentistas',
  'side.settings': 'Ajustes',
  'side.soon': 'Pronto',
  'side.signedIn': 'Conectado',
  'side.signOut': 'Cerrar sesión',
  'side.closeNav': 'Cerrar navegación',
  'side.openNav': 'Abrir navegación',

  // Not found
  'nf.title': 'Página no encontrada',
  'nf.desc':
    'No encontramos esa página. Puede que se haya movido o que el enlace sea incorrecto.',

  // Calendar / chart day labels (comma-separated, Sunday first)
  'cal.weekdaysShort': 'Do,Lu,Ma,Mi,Ju,Vi,Sá',
  'chart.daysShort': 'Dom,Lun,Mar,Mié,Jue,Vie,Sáb',
};

export const translations: Record<Lang, Dict> = { en, es };
