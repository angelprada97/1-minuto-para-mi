import { HospitalRole, Routine, RoutineCategory } from '../types';

export const HOSPITAL_ROLES: HospitalRole[] = [
  {
    id: 'todos',
    name: 'Todo el Personal HUV',
    shortName: 'General',
    badge: 'HUV Integral',
    icon: 'Users',
    description: 'Pausas universales de 1 minuto para cualquier colaborador del Hospital Universitario del Valle.',
    commonAilments: ['Fatiga general', 'Tensión de guardia', 'Agotamiento mental']
  },
  {
    id: 'enfermeria',
    name: 'Enfermería y Pisos',
    shortName: 'Enfermería',
    badge: 'Jornada de Pie',
    icon: 'HeartHandshake',
    description: 'Enfocado en aliviar piernas pesadas, sobrecarga lumbar y hombros por traslado de pacientes y rondas continuas.',
    commonAilments: ['Sobrecarga lumbar', 'Pies y piernas cansadas', 'Tensión dorsal']
  },
  {
    id: 'medicos',
    name: 'Médicos de Urgencias y Cirugía',
    shortName: 'Médicos / Cirugía',
    badge: 'Alta Exigencia',
    icon: 'Stethoscope',
    description: 'Enfocado en descontracturar cuello y hombros por cirugías o procedimientos, y reseteo mental de alta presión.',
    commonAilments: ['Rigidez cervical', 'Trapecios tensos', 'Sobrecarga cognitiva']
  },
  {
    id: 'administrativo',
    name: 'Administración, Facturación y Citas',
    shortName: 'Administrativo',
    badge: 'Puesto Fijo',
    icon: 'Monitor',
    description: 'Para quienes pasan el turno sentados frente a terminales de historias clínicas, facturación o archivo.',
    commonAilments: ['Fatiga visual', 'Túnel carpiano y dedos', 'Columna encorvada']
  },
  {
    id: 'camilleros',
    name: 'Camilleros, Movilización y Apoyo',
    shortName: 'Camilleros / Apoyo',
    badge: 'Carga Física',
    icon: 'Activity',
    description: 'Ejercicios para proteger la columna baja, gemelos y articulaciones en el traslado y movilización física.',
    commonAilments: ['Espalda baja', 'Articulación de rodillas', 'Brazos y antebrazos']
  },
  {
    id: 'laboratorio',
    name: 'Laboratorio, Farmacia e Imágenes',
    shortName: 'Laboratorio / Farmacia',
    badge: 'Precisión Manual',
    icon: 'FlaskConical',
    description: 'Alivio para flexión continua de cuello sobre microscopio, pipeteo repetitivo y revisión visual fina.',
    commonAilments: ['Muñecas y pulgares', 'Cuello caído', 'Cansancio ocular fino']
  }
];

export const ROUTINE_CATEGORIES: RoutineCategory[] = [
  {
    id: 'estiramiento',
    name: 'Ejercicios de Estiramiento',
    tagline: 'Libera la tensión muscular acumulada en el turno',
    description: 'Movilidad articular y elongación suave de trapecios, cuello, espalda y extremidades sin sudar ni desacomodar el uniforme.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Musculoesquelético',
    colorClass: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      text: 'text-emerald-800 dark:text-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      ring: 'focus-visible:ring-emerald-500'
    }
  },
  {
    id: 'descanso-visual',
    name: 'Descanso Visual',
    tagline: 'Alivio para ojos expuestos a pantallas y luces clínicas',
    description: 'Protocolos de acomodación pupilar, parpadeo lubricante y relajación ocular adaptados a monitores de signos vitales e historias clínicas.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Salud Ocular',
    colorClass: {
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      border: 'border-teal-200 dark:border-teal-800/60',
      text: 'text-teal-800 dark:text-teal-300',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200',
      ring: 'focus-visible:ring-teal-500'
    }
  },
  {
    id: 'respiracion',
    name: 'Respiración Guiada',
    tagline: 'Regulación del ritmo cardíaco y calma bajo presión',
    description: 'Técnicas clínicas de respiración (cuadrada, 4-7-8 y doble suspiro fisiológico) para bajar niveles de cortisol y recuperar concentración.',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Neuromuscular & Mente',
    colorClass: {
      bg: 'bg-cyan-50 dark:bg-cyan-950/40',
      border: 'border-cyan-200 dark:border-cyan-800/60',
      text: 'text-cyan-800 dark:text-cyan-300',
      badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
      ring: 'focus-visible:ring-cyan-500'
    }
  },
  {
    id: 'descompresion-express',
    name: 'Descompresión Exprés (60s)',
    tagline: 'Pausa integral rápida antes o después de una atención crítica',
    description: 'Combinación armónica de respiración de descompresión, desbloqueo postural y reinicio mental en exactamente 60 segundos.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Reinicio Rápido',
    colorClass: {
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      border: 'border-sky-200 dark:border-sky-800/60',
      text: 'text-sky-800 dark:text-sky-300',
      badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
      ring: 'focus-visible:ring-sky-500'
    }
  }
];

export const ROUTINES: Routine[] = [
  // ESTIRAMIENTO
  {
    id: 'estiramiento-cervical-trapecio',
    title: 'Descompresión Cervical y Trapecio Superior',
    categoryId: 'estiramiento',
    categoryName: 'Ejercicios de Estiramiento',
    targetRoles: ['todos', 'medicos', 'enfermeria', 'administrativo', 'laboratorio'],
    posture: 'cualquiera',
    durationSec: 60,
    shortDescription: 'Alivia la rigidez en la base del cráneo y los hombros causada por sostener la cabeza inclinada.',
    fullDescription: 'Tres movimientos controlados de 20 segundos cada uno para liberar la contractura de los músculos esternocleidomastoideo y trapecio, frecuentes tras horas de atención o digitación.',
    benefits: ['Disminuye cefaleas tensionales', 'Restaura el rango de giro cervical', 'Alivia la pesadez de hombros'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    intensity: 'Suave',
    huvCareTip: 'Mantén los hombros relajados hacia abajo mientras inclinas la cabeza; no fuerces el movimiento.',
    steps: [
      {
        id: 'step-1',
        title: 'Inclinación lateral derecha suave',
        durationSec: 20,
        instruction: 'Lleva suavemente tu oreja derecha hacia el hombro derecho. Deja que el peso natural de tu cabeza estire el costado izquierdo del cuello.',
        postureTip: 'Baja conscientemente el hombro izquierdo hacia el suelo.',
        breathingHint: 'Inhala en 3 segundos, exhala lento por la boca sintiendo cómo se suelta la cuerda del trapecio.',
        type: 'estiramiento'
      },
      {
        id: 'step-2',
        title: 'Inclinación lateral izquierda suave',
        durationSec: 20,
        instruction: 'Regresa al centro despacio e inclina ahora la oreja izquierda hacia el hombro izquierdo.',
        postureTip: 'Mantén la mirada al frente, sin rotar la barbilla.',
        breathingHint: 'Respira con calma. Siente el alargamiento en el costado derecho de tu cuello.',
        type: 'estiramiento'
      },
      {
        id: 'step-3',
        title: 'Mentón al pecho con hombros abajo',
        durationSec: 20,
        instruction: 'Lleva el mentón hacia la horquilla esternal. Si deseas, apoya las yemas de tus dedos sobre la coronilla sin presionar con fuerza.',
        postureTip: 'Mantén la espalda recta; dobla solo el cuello, no la columna dorsal.',
        breathingHint: 'Exhala profundo y siente el alivio en la nuca y base del cráneo.',
        type: 'estiramiento'
      }
    ]
  },
  {
    id: 'estiramiento-hombros-escapulas',
    title: 'Apertura Pectoral y Círculos Escapulares',
    categoryId: 'estiramiento',
    categoryName: 'Ejercicios de Estiramiento',
    targetRoles: ['todos', 'enfermeria', 'medicos', 'camilleros'],
    posture: 'de_pie',
    durationSec: 60,
    shortDescription: 'Corrige la postura de hombros adelantados por sostener camillas, bandejas o escribir historias.',
    fullDescription: 'Movilización guiada de la cintura escapular para activar la irrigación sanguínea hacia los brazos y abrir la caja torácica para respirar mejor.',
    benefits: ['Abre el pecho y mejora la ventilación', 'Desbloquea las escápulas y la espalda alta', 'Reduce la sensación de carga en brazos'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    intensity: 'Suave',
    huvCareTip: 'Excelente pausa para hacer antes o después de trasladar un paciente o tras salir de un procedimiento en quirófano.',
    steps: [
      {
        id: 'step-1',
        title: 'Rotación posterior amplia de hombros',
        durationSec: 20,
        instruction: 'Dibuja círculos grandes y lentos con ambos hombros hacia atrás. Sube hacia las orejas, abre atrás juntando escápulas y baja.',
        postureTip: 'Pies paralelos al ancho de caderas y rodillas sin bloquear.',
        breathingHint: 'Inhala al subir los hombros, exhala largo al bajarlos.',
        type: 'movilidad'
      },
      {
        id: 'step-2',
        title: 'Entrelace posterior y apertura torácica',
        durationSec: 20,
        instruction: 'Lleva las manos atrás de la cintura baja. Abre el pecho, junta suavemente las paletas de la espalda y proyecta el esternón hacia el frente.',
        postureTip: 'No arquees la zona lumbar, aprieta sutilmente el abdomen.',
        breathingHint: 'Toma una respiración diafragmática profunda llenando el pecho.',
        type: 'estiramiento'
      },
      {
        id: 'step-3',
        title: 'Abrazo cruzado interescapular',
        durationSec: 20,
        instruction: 'Cruza ambos brazos frente a tu pecho abrazándote por los omóplatos. Inclina apenas el torso sintiendo la apertura dorsal.',
        postureTip: 'Siente cómo se expande el espacio entre tus dos escápulas.',
        breathingHint: 'Exhala todo el aire y siente el agradecimiento por tu labor.',
        type: 'estiramiento'
      }
    ]
  },
  {
    id: 'estiramiento-tunel-carpiano',
    title: 'Túnel Carpiano, Dedos y Muñecas Clínicas',
    categoryId: 'estiramiento',
    categoryName: 'Ejercicios de Estiramiento',
    targetRoles: ['administrativo', 'laboratorio', 'enfermeria', 'medicos'],
    posture: 'cualquiera',
    durationSec: 60,
    shortDescription: 'Previene el síndrome de túnel carpiano por teclado, pipeteo, canalización de vías o manejo de instrumental.',
    fullDescription: 'Elongación de flexores y extensores del antebrazo con apertura de la fascia palmar, ideal para personal con micro-movimientos repetitivos.',
    benefits: ['Previene dolor en muñeca y dedos', 'Reduce la presión del nervio mediano', 'Restaura la sensibilidad y destreza fina'],
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    intensity: 'Suave',
    huvCareTip: 'Recuerda lavarte o desinfectarte las manos con alcohol glicerinado institucional del HUV antes de la pausa.',
    steps: [
      {
        id: 'step-1',
        title: 'Estiramiento flexor de muñeca derecha e izquierda',
        durationSec: 30,
        instruction: 'Extiende el brazo derecho al frente a la altura del hombro, palma hacia arriba. Con la mano izquierda, toma suavemente los dedos y llévalos hacia atrás. A los 15s cambia de brazo.',
        postureTip: 'Mantén el codo en extensión suave sin hiperextender.',
        breathingHint: 'Respira fluido; no aguantes la respiración.',
        type: 'estiramiento'
      },
      {
        id: 'step-2',
        title: 'Círculos suaves de muñeca y abanico de dedos',
        durationSec: 30,
        instruction: 'Abre y cierra los dedos con fuerza 5 veces como un abanico. Luego rota ambas muñecas hacia afuera 10 segundos y hacia adentro otros 10 segundos.',
        postureTip: 'Relaja los antebrazos y mantén los hombros sueltos.',
        breathingHint: 'Siente la calidez y el retorno del flujo sanguíneo a tus dedos.',
        type: 'movilidad'
      }
    ]
  },
  {
    id: 'estiramiento-lumbar-camilleros',
    title: 'Descompresión Lumbar y Retorno Venoso',
    categoryId: 'estiramiento',
    categoryName: 'Ejercicios de Estiramiento',
    targetRoles: ['camilleros', 'enfermeria', 'todos'],
    posture: 'de_pie',
    durationSec: 60,
    shortDescription: 'Descarga la zona baja de la espalda y activa las pantorrillas para aliviar piernas pesadas.',
    fullDescription: 'Combinación de flexión asistida con manos en muslos y bombeo muscular de gemelos para reactivar la bomba del sóleo.',
    benefits: ['Descomprime discos L4-L5-S1', 'Promueve el retorno venoso periférico', 'Disminuye la fatiga al final del turno'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    intensity: 'Media',
    huvCareTip: 'Si estás usando zapatos clínicos antideslizantes, asegúrate de mantener un buen apoyo en suelo seco.',
    steps: [
      {
        id: 'step-1',
        title: 'Auto-descompresión lumbar con apoyo en muslos',
        durationSec: 30,
        instruction: 'Separa los pies al ancho de hombros, flexiona ligeramente las rodillas y apoya firmemente las palmas sobre los muslos. Empuja suavemente para alargar tu columna vertebral como un acordeón.',
        postureTip: 'Mantén el cuello alineado con la columna; no mires hacia arriba.',
        breathingHint: 'Inhala sintiendo cómo se separan tus vértebras lumbares, exhala soltando la rigidez.',
        type: 'estiramiento'
      },
      {
        id: 'step-2',
        title: 'Bombeo de gemelos (bomba del sóleo)',
        durationSec: 30,
        instruction: 'Ponte de puntillas sobre los metatarsos elevando los talones, mantén 2 segundos arriba y baja suavemente. Repite 10 a 12 veces a ritmo cadencioso.',
        postureTip: 'Puedes apoyarte ligeramente de una pared o mesa si requieres equilibrio.',
        breathingHint: 'Siente cómo sube la sangre desde los tobillos al corazón.',
        type: 'movilidad'
      }
    ]
  },

  // DESCANSO VISUAL
  {
    id: 'visual-regla-20-20-20',
    title: 'Regla 20-20-20 Hospitalaria y Acomodación',
    categoryId: 'descanso-visual',
    categoryName: 'Descanso Visual',
    targetRoles: ['todos', 'administrativo', 'medicos', 'laboratorio', 'enfermeria'],
    posture: 'cualquiera',
    durationSec: 60,
    shortDescription: 'Relaja el músculo ciliar del ojo tras fijar la mirada en pantallas de turno o microscopios.',
    fullDescription: 'Protocolo optométrico de acomodación lejana (mirar a 6 metros o más) combinado con parpadeo consciente para regenerar la película lagrimal.',
    benefits: ['Evita el ojo seco y la sensación de arenilla', 'Disminuye la fatiga mental por pantallas', 'Previene el desenfoque al final de la jornada'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    intensity: 'Suave',
    huvCareTip: 'Mira a través de una ventana del pasillo del HUV o al punto más lejano del pabellón donde te encuentres.',
    steps: [
      {
        id: 'step-1',
        title: 'Fijación en punto lejano (>6 metros)',
        durationSec: 20,
        instruction: 'Aparta la vista de toda pantalla o papel. Dirige tu mirada hacia el final del pasillo o a través de la ventana a un objeto lejano (un árbol, un edificio). Observa sus contornos sin forzar.',
        postureTip: 'Relaja los músculos de la frente y el entrecejo.',
        breathingHint: 'Respira despacio y profundo mientras tu vista descansa en el infinito.',
        type: 'visual'
      },
      {
        id: 'step-2',
        title: 'Parpadeo consciente y lubricación',
        durationSec: 20,
        instruction: 'Cierra los párpados completamente de manera suave durante 2 segundos, luego ábrelos. Repite 6 a 8 veces a ritmo regular para repartir la lágrima.',
        postureTip: 'No aprietes los párpados con fuerza; hazlo como si durmieras un segundo.',
        breathingHint: 'Al cerrar, exhala; al abrir, inhala suave.',
        type: 'visual'
      },
      {
        id: 'step-3',
        title: 'Enfoque dinámico cerca-lejos',
        durationSec: 20,
        instruction: 'Coloca tu pulgar a 30 cm de tu rostro. Enfoca la uña de tu pulgar durante 2 segundos, luego enfoca el punto lejano 2 segundos. Alterna 5 veces.',
        postureTip: 'Mantén la cabeza fija y mueve solo el enfoque de los ojos.',
        breathingHint: 'Excelente para tonificar el músculo ciliar.',
        type: 'visual'
      }
    ]
  },
  {
    id: 'visual-palming-sin-contacto',
    title: 'Baño de Oscuridad y Relajación Ocular',
    categoryId: 'descanso-visual',
    categoryName: 'Descanso Visual',
    targetRoles: ['todos', 'administrativo', 'medicos', 'enfermeria'],
    posture: 'sentado',
    durationSec: 60,
    shortDescription: 'Oscuridad restauradora para los fotorreceptores retinianos saturados por luz blanca hospitalaria.',
    fullDescription: 'Cerrar los ojos creando una cúpula sin contacto con las manos para descansar la retina y reducir la sobreestimulación visual del turno.',
    benefits: ['Descarga profunda del nervio óptico', 'Reduce la fotosensibilidad', 'Calma instantánea en 60 segundos'],
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f02e604f5e0?auto=format&fit=crop&w=800&q=80',
    intensity: 'Restaurativa',
    huvCareTip: 'Por bioseguridad en el HUV, NO toques tus globos oculares. Mantén las manos ahuecadas a 2 cm de los párpados cerrados.',
    steps: [
      {
        id: 'step-1',
        title: 'Generación de calor palmar',
        durationSec: 15,
        instruction: 'Frota enérgicamente las palmas de tus manos limpias durante 15 segundos hasta sentir una agradable sensación de calor tibio.',
        postureTip: 'Mantén los codos pegados al cuerpo para no cansar los hombros.',
        breathingHint: 'Inhala energía, prepárate para la oscuridad tranquila.',
        type: 'movilidad'
      },
      {
        id: 'step-2',
        title: 'Cúpula de oscuridad cálida sin presión',
        durationSec: 45,
        instruction: 'Cierra tus ojos. Coloca tus palmas ahuecadas sobre las órbitas oculares bloqueando la luz pero SIN tocar tus párpados ni presionar los ojos. Respira en la oscuridad total.',
        postureTip: 'Apoya los codos en tu escritorio o sobre tus rodillas.',
        breathingHint: 'Imagina el color negro más puro y relajante. Respira lento y exhala el cansancio acumulado.',
        type: 'visual'
      }
    ]
  },

  // RESPIRACIÓN GUIADA
  {
    id: 'respiracion-cuadrada-estres',
    title: 'Respiración Cuadrada (Box Breathing 4x4)',
    categoryId: 'respiracion',
    categoryName: 'Respiración Guiada',
    targetRoles: ['todos', 'medicos', 'enfermeria', 'camilleros'],
    posture: 'cualquiera',
    durationSec: 60,
    shortDescription: 'La técnica utilizada por cirujanos y equipos de trauma para recobrar el control bajo estrés agudo.',
    fullDescription: 'Cuatro fases iguales de 4 segundos cada una: Inhalar (4s) - Retener con aire (4s) - Exhalar (4s) - Retener sin aire (4s). Se realizan 3 a 4 ciclos completos en 60 segundos.',
    benefits: ['Equilibra el sistema nervioso autónomo', 'Disminuye la taquicardia situacional', 'Otorga claridad mental para toma de decisiones clínicas'],
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=800&q=80',
    intensity: 'Restaurativa',
    huvCareTip: 'Ideal tras una emergencia de código o antes de entregar un turno complejo en hospitalización.',
    steps: [
      {
        id: 'step-1',
        title: 'Ciclo 1: Base de calma (4s x 4)',
        durationSec: 20,
        instruction: 'Inhala por la nariz inflando el abdomen en 4 segundos... Sostén el aire en tus pulmones 4 segundos... Exhala suave por la boca en 4 segundos... Mantén vacío 4 segundos.',
        postureTip: 'Columna erguida pero sin rigidez militar; suelta la mandíbula.',
        breathingHint: '4s Inhala → 4s Sostén → 4s Exhala → 4s Espera.',
        type: 'respiracion'
      },
      {
        id: 'step-2',
        title: 'Ciclo 2: Profundización del pulso',
        durationSec: 20,
        instruction: 'Repite el cuadro: Inhala 4 segundos llenando la base pulmonar... Sostén con calma 4s... Exhala lento en 4s liberando toda prisa... Sostén vacío 4s.',
        postureTip: 'Siente cómo disminuyen las pulsaciones en tus sienes y cuello.',
        breathingHint: 'Fluye en el ritmo cuadrado. Tu cuerpo está seguro aquí.',
        type: 'respiracion'
      },
      {
        id: 'step-3',
        title: 'Ciclo 3: Retorno enfocado y sereno',
        durationSec: 20,
        instruction: 'Último ciclo cuadrado: Inhala 4s... Sostén 4s... Exhala en 4s soltando la carga del turno... Sostén 4s y retoma tu ritmo natural.',
        postureTip: 'Abre suavemente los ojos si los tenías cerrados.',
        breathingHint: 'Nota la lucidez y presencia que acabas de recuperar.',
        type: 'respiracion'
      }
    ]
  },
  {
    id: 'respiracion-doble-suspiro',
    title: 'Doble Suspiro Fisiológico Neuro-Calmante',
    categoryId: 'respiracion',
    categoryName: 'Respiración Guiada',
    targetRoles: ['todos', 'enfermeria', 'medicos', 'administrativo'],
    posture: 'cualquiera',
    durationSec: 60,
    shortDescription: 'El mecanismo biológico más veloz para desactivar la alarma del sistema simpático en 1 minuto.',
    fullDescription: 'Dos inhalaciones nasales consecutivas (una profunda + una corta en el tope para reabrir alvéolos colapsados) seguidas de una exhalación bucal muy prolongada.',
    benefits: ['Reduce rápidamente el cortisol circulante', 'Reinfla alvéolos pulmonares colapsados', 'Elimina la sensación de falta de aire por ansiedad'],
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    intensity: 'Restaurativa',
    huvCareTip: 'Respaldado por estudios neurobiológicos. Es discreto y puedes realizarlo en cualquier estación de enfermería o pasillo.',
    steps: [
      {
        id: 'step-1',
        title: 'Suspiro fisiológico 1 y 2',
        durationSec: 20,
        instruction: 'Inhala hondo por la nariz hasta el 80%... sin botar el aire, inhala un sorbo extra al tope por la nariz... y exhala largo, suave y continuo por la boca hasta vaciarte por completo.',
        postureTip: 'Deja caer los hombros pesados durante la exhalación larga.',
        breathingHint: 'Inhala... Inhala un poco más... y Exhaaaala lento.',
        type: 'respiracion'
      },
      {
        id: 'step-2',
        title: 'Suspiro fisiológico 3 y 4',
        durationSec: 20,
        instruction: 'Repite: Inhala profundo por la nariz... añade un segundo toque nasal al máximo... y suelta el aire con un suspiro audible y placentero.',
        postureTip: 'Siente cómo el diafragma desciende y relaja el estómago.',
        breathingHint: 'La exhalación debe durar el doble de tiempo que la inhalación.',
        type: 'respiracion'
      },
      {
        id: 'step-3',
        title: 'Pausa neutra y reintegración',
        durationSec: 20,
        instruction: 'Permite que tu respiración vuelva a su cauce natural. Observa cómo tus músculos se sienten notablemente más sueltos que hace 40 segundos.',
        postureTip: 'Dibuja una pequeña sonrisa interior de reconocimiento a tu valor.',
        breathingHint: 'Respira con tranquilidad y gratitud por cuidarte.',
        type: 'respiracion'
      }
    ]
  },

  // DESCOMPRESIÓN EXPRÉS
  {
    id: 'descompresion-reset-guardia',
    title: 'Reset Integral de Guardia en 60 Segundos',
    categoryId: 'descompresion-express',
    categoryName: 'Descompresión Exprés (60s)',
    targetRoles: ['todos', 'enfermeria', 'medicos', 'camilleros', 'administrativo', 'laboratorio'],
    posture: 'cualquiera',
    durationSec: 60,
    shortDescription: 'La pausa multifuncional más balanceada: respiración diafragmática, soltura de trapecios y presencia mental.',
    fullDescription: 'Diseñada específicamente para el personal de turno del HUV que solo dispone de 60 segundos exactos entre pacientes, procedimientos o llamadas.',
    benefits: ['Corta el ciclo de fatiga acumulada', 'Descontractura cuello y hombros en segundos', 'Devuelve la energía para continuar el turno'],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    intensity: 'Restaurativa',
    huvCareTip: 'Tómala cada 2 o 3 horas de turno para mantener tu lucidez clínica y prevenir lesiones musculoesqueléticas.',
    steps: [
      {
        id: 'step-1',
        title: 'Fase 1 (0-20s): Descarga de hombros y suspiro',
        durationSec: 20,
        instruction: 'Inhala levantando ambos hombros con fuerza hacia las orejas; sostén 2 segundos y déjalos caer de golpe mientras exhalas con un suspiro. Repite 3 veces.',
        postureTip: 'Suelta cualquier tensión acumulada en las manos y los puños.',
        breathingHint: 'Sube tensión... ¡y déjala caer por completo!',
        type: 'movilidad'
      },
      {
        id: 'step-2',
        title: 'Fase 2 (20-40s): Estiramiento lateral de cuello y mirada lejana',
        durationSec: 20,
        instruction: 'Inclina suavemente la cabeza 10 segundos a la derecha mirando hacia el horizonte lejano, y luego 10 segundos a la izquierda.',
        postureTip: 'Relaja la mirada; no fijes los ojos en ningún objeto cercano.',
        breathingHint: 'Respira sereno y continuo.',
        type: 'estiramiento'
      },
      {
        id: 'step-3',
        title: 'Fase 3 (40-60s): Anclaje y afirmación de autocuidado',
        durationSec: 20,
        instruction: 'Coloca una mano sobre tu pecho. Siente el latido de tu corazón. Reconoce que para cuidar la vida de los pacientes del HUV, primero necesitas cuidar de ti.',
        postureTip: 'Siente tus pies firmemente plantados sobre el suelo.',
        breathingHint: 'Toma una última inhalación nutritiva y sonríe: estás listo para continuar.',
        type: 'respiracion'
      }
    ]
  },
  {
    id: 'descompresion-activacion-nocturna',
    title: 'Activación y Claridad para Turno Nocturno (3:00 AM)',
    categoryId: 'descompresion-express',
    categoryName: 'Descompresión Exprés (60s)',
    targetRoles: ['todos', 'enfermeria', 'medicos', 'camilleros'],
    posture: 'de_pie',
    durationSec: 60,
    shortDescription: 'Combate la somnolencia y reactiva la circulación en el bajón circadiano de la madrugada.',
    fullDescription: 'Movimientos coordinados de brazos, estiramiento de columna y respiración activadora para recuperar la alerta mental sin requerir más cafeína.',
    benefits: ['Eleva el estado de alerta neurocognitiva', 'Activa la circulación periférica', 'Despeja la pesadez en los párpados'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    intensity: 'Media',
    huvCareTip: 'Acompáñalo con un vaso de agua fresca para rehidratar tus mucosas en el ambiente hospitalario con aire acondicionado.',
    steps: [
      {
        id: 'step-1',
        title: 'Alcance al cielo y extensión espinal',
        durationSec: 20,
        instruction: 'Eleva ambos brazos hacia el techo, entrelaza los dedos y estírate hacia arriba como si quisieras tocar el cielo, poniéndote sobre las puntas de los pies.',
        postureTip: 'Alarga todo el torso abriendo los costados.',
        breathingHint: 'Inhala profundamente llenando toda la capacidad torácica.',
        type: 'estiramiento'
      },
      {
        id: 'step-2',
        title: 'Torsión suave de tronco con brazos sueltos',
        durationSec: 20,
        instruction: 'Con los pies firmes en el suelo, gira suavemente tu torso de izquierda a derecha dejando que tus brazos cuelguen como cuerdas sueltas.',
        postureTip: 'Deja que el movimiento sea fluido y relajado.',
        breathingHint: 'Exhala en cada giro liberando la pereza nocturna.',
        type: 'movilidad'
      },
      {
        id: 'step-3',
        title: 'Respiración de fuego suave / Activación',
        durationSec: 20,
        instruction: 'Realiza 10 respiraciones nasales cortas y rítmicas, seguidas de una inhalación profunda y exhalación completa.',
        postureTip: 'Siente el calor y la energía revitalizante recorriendo tu cuerpo.',
        breathingHint: '¡Mente lúcida, reflejos despiertos!',
        type: 'respiracion'
      }
    ]
  }
];
