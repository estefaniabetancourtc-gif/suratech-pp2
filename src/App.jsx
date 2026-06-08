import { useState } from 'react';

const S = { bg:'#EBF4FC', card:'#FFFFFF', blue:'#156082', navy:'#0E2841', mid:'#1976D2', light:'#D6EAF8', xlight:'#EBF5FB', yellow:'#F5BD00', yelBg:'#FEF9E7', text:'#0E2841', muted:'#5D7A8A', border:'#C8DFF0', white:'#FFFFFF' };
const font = "'Nunito','Segoe UI',sans-serif";
const R = {
  teal:  { bg:'#E1F5EE', li:'#9FE1CB', mi:'#1D9E75', da:'#0F6E56', xd:'#085041' },
  purp:  { bg:'#EEEDFE', li:'#CECBF6', mi:'#7F77DD', da:'#534AB7', xd:'#3C3489' },
  coral: { bg:'#FAECE7', li:'#F5C4B3', mi:'#D85A30', da:'#993C1D', xd:'#712B13' },
  blue:  { bg:'#E6F1FB', li:'#B5D4F4', mi:'#378ADD', da:'#185FA5', xd:'#0C447C' },
  amber: { bg:'#FAEEDA', li:'#FAC775', mi:'#BA7517', da:'#854F0B', xd:'#633806' },
  gray:  { bg:'#F1EFE8', li:'#D3D1C7', mi:'#888780', da:'#5F5E5A' },
  green: { bg:'#EAF3DE', li:'#C0DD97', mi:'#639922', da:'#3B6D11' },
  pink:  { bg:'#FBEAF0', li:'#F4C0D1', mi:'#D4537E', da:'#993556', xd:'#72243E' },
};
const NAV = [
  { id:'equipo', label:'Equipo', icon:'◈' },
  { id:'metodo', label:'Metodología', icon:'◎' },
  { id:'fund', label:'Fundamentales', icon:'✦' },
  { id:'tribus', label:'Tribus', icon:'⬢' },
  { id:'ix', label:'Interacciones', icon:'⟷' },
  { id:'bu', label:'BU & Squads', icon:'⬡' },
  { id:'gantt', label:'Roadmap', icon:'▬' },
];
const PageBg = ({ children }) => <div style={{ fontFamily:font, background:S.bg, minHeight:'100vh', padding:'0 0 48px' }}>{children}</div>;
const Card = ({ children, style={} }) => <div style={{ background:S.card, borderRadius:14, border:`1px solid ${S.border}`, padding:'18px 18px', ...style }}>{children}</div>;
const SecNum = ({ n }) => <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:'50%', background:S.yellow, flexShrink:0 }}><span style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.navy }}>{n}</span></div>;
const Sec = ({ n, t }) => <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}><SecNum n={n} /><span style={{ fontFamily:font, fontSize:17, fontWeight:800, color:S.navy, letterSpacing:'-.01em' }}>{t}</span></div>;
const Tag = ({ label, bg, color }) => <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20, background:bg||S.light, color:color||S.blue, display:'inline-block' }}>{label}</span>;
const Dot = ({ c, n }) => <div style={{ display:'flex', alignItems:'flex-start', gap:7, marginBottom:5, fontSize:12, color:S.text }}><div style={{ width:6, height:6, borderRadius:'50%', background:c||S.mid, flexShrink:0, marginTop:5 }} />{n}</div>;
const Banner = ({ children, bg }) => <div style={{ background:bg||S.xlight, borderRadius:12, padding:'14px 16px', marginBottom:18, border:`1px solid ${S.border}`, display:'flex', gap:12, alignItems:'flex-start' }}>{children}</div>;

/* ── REUSABLE COMPONENTS ── */
const MetricCard = ({ v, l, d, como, frec, meta }) => (
  <Card style={{ padding:'18px 16px' }}>
    <div style={{ fontFamily:font, fontSize:28, fontWeight:900, color:S.blue, marginBottom:2 }}>{v}</div>
    <div style={{ fontFamily:font, fontSize:11, fontWeight:700, color:S.navy, marginBottom:10 }}>{l}</div>
    <div style={{ fontSize:10, color:S.muted, lineHeight:1.5, marginBottom:10 }}>{d}</div>
    <div style={{ borderTop:`1px solid ${S.border}`, paddingTop:10, display:'flex', flexDirection:'column', gap:7 }}>
      <div>
        <div style={{ fontSize:8, fontWeight:800, color:S.blue, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:3 }}>Cómo medirlo</div>
        <div style={{ fontSize:10, color:S.text, lineHeight:1.5 }}>{como}</div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:5 }}>
        <div>
          <div style={{ fontSize:8, fontWeight:800, color:S.blue, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:3 }}>Frecuencia</div>
          <div style={{ fontSize:10, color:S.muted }}>{frec}</div>
        </div>
        <span style={{ fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20, background:S.yelBg, color:S.navy }}>{meta}</span>
      </div>
    </div>
  </Card>
);

const PersonRow = ({ name, color, prods, badge, sx }) => (
  <Card style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:12, borderLeft:`4px solid ${color}`, ...sx }}>
    <div style={{ width:34, height:34, borderRadius:'50%', background:color+'18', border:`2px solid ${color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ fontSize:11, fontWeight:800, color }}>{name.split(' ').map(w=>w[0]).join('').slice(0,2)}</span>
    </div>
    <span style={{ fontFamily:font, fontSize:13, fontWeight:700, color:S.navy, minWidth:150 }}>{name}</span>
    {badge && <span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:R.teal.bg, color:R.teal.da, flexShrink:0 }}>{badge}</span>}
    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
      {prods.map(p => <span key={p} style={{ fontSize:10, padding:'3px 10px', borderRadius:20, background:S.xlight, color:S.blue, fontWeight:600, border:`1px solid ${S.border}` }}>{p}</span>)}
    </div>
  </Card>
);

function EspectroCard() {
  return (
    <Card style={{ padding:0, overflow:'hidden', marginBottom:20 }}>
      <div style={{ background:S.navy, padding:'20px 24px 28px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:9, fontWeight:800, color:'#4FC3F7', letterSpacing:'.06em', textTransform:'uppercase' }}>← Más comercial</span>
          <span style={{ fontSize:9, fontWeight:800, color:'#CE93D8', letterSpacing:'.06em', textTransform:'uppercase' }}>Más técnico →</span>
        </div>
        <div style={{ position:'relative', paddingBottom:36 }}>
          <div style={{ height:8, borderRadius:4, background:'linear-gradient(90deg, #4FC3F7 0%, #7986CB 40%, #F5BD00 62%, #CE93D8 100%)' }} />
          {[{ l:'Country Manager', pct:8, highlight:false, color:'#4FC3F7' }, { l:'Business Owner', pct:30, highlight:false, color:'#9FA8DA' }, { l:'Product Manager', pct:60, highlight:true, color:S.yellow }, { l:'Program Manager', pct:88, highlight:false, color:'#CE93D8' }].map((r,i) => (
            <div key={i} style={{ position:'absolute', top:-4, left:`${r.pct}%`, transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <div style={{ width:14, height:14, borderRadius:'50%', background:r.highlight?S.yellow:S.navy, border:`2px solid ${r.color}`, boxShadow:r.highlight?`0 0 10px ${S.yellow}88`:`0 0 6px ${r.color}66` }} />
              <span style={{ fontSize:9, fontWeight:r.highlight?900:600, color:r.highlight?S.yellow:r.color, textAlign:'center', lineHeight:1.3, whiteSpace:'nowrap', marginTop:2 }}>{r.l}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ── DATA ── */
function RefsBiblio() {
  const [open, setOpen] = useState(false);
  const refs = [
    { ref:'Team Topologies', auth:'Skelton & Pais, 2019', desc:'"Enabling Team": el especialista transfiere capacidad al PO hasta que opere autónomamente. Un enabling team indefinidamente necesario ha fallado.' },
    { ref:'Accelerate', auth:'Forsgren, Humble & Kim, 2019', desc:'Alto rendimiento = menos handoffs, más ownership end-to-end. Cada dependencia estructural reduce frecuencia de entrega.' },
    { ref:'Continuous Discovery Habits', auth:'Teresa Torres, 2021', desc:'POs de alto rendimiento diseñan los procesos que habilitan su producto. Separar "diseño de producto" de "diseño de proceso" genera fricción que escala negativamente.' },
    { ref:'The Unicorn Project', auth:'Gene Kim, 2019', desc:'"Five Ideals": Focus, Flow & Joy requiere que los equipos completen su trabajo sin dependencias permanentes de otros equipos.' },
  ];
  return (
    <div style={{ border:`1px solid ${S.border}`, borderRadius:10, overflow:'hidden' }}>
      <button onClick={() => setOpen(o=>!o)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:S.xlight, border:'none', cursor:'pointer', fontFamily:font }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <span style={{ fontSize:13 }}>📚</span>
          <span style={{ fontSize:11, fontWeight:800, color:S.blue }}>Bibliografía de referencia</span>
          <span style={{ fontSize:9, color:S.muted }}>— 4 fuentes</span>
        </div>
        <span style={{ fontSize:12, color:S.muted, transform:open?'rotate(90deg)':'none', transition:'transform .2s' }}>›</span>
      </button>
      {open && (
        <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', gap:7, background:S.card }}>
          {refs.map(r => (
            <div key={r.ref} style={{ display:'flex', gap:9, fontSize:11, lineHeight:1.55 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:S.blue, flexShrink:0, marginTop:4 }} />
              <div><span style={{ fontWeight:800, color:S.navy }}>{r.ref}</span><span style={{ color:S.muted }}> · {r.auth}</span><span style={{ color:S.muted }}> — {r.desc}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PM_PERSON = { name:'Juliana González', color:'#BA7517', prods:['👷 Pilotos', '🗂 Gestión del portafolio en la filial'] };
const PO_LIST = [
  { name:'Laura Garcia',       color:'#156082', prods:['🚗 Rediseño Carros Col','🛵 Motos Col'] },
  { name:'Juli Aleman',        color:'#4EA72E', prods:['🛵 Motos Col entregando a Laura Garcia','🐾 Salud Mascotas (Col)'] },
  { name:'Ana Cano/Aleja Galvis', color:'#A02B93', prods:['🏠 Arriendo CDD Col','✈️ Viajes CDD Col'] },
  { name:'Milady',             color:'#0F9ED5', prods:['🏥 Salud para dos Col','🏠 Arriendo Tu360'] },
  { name:'Diana Caro',         color:'#D4537E', prods:['🚗 Carros Chile 🇨🇱'] },
];
const PROC_BLOCKS = [
  { block:'Onboarding', c:R.teal,  icon:'🚀', desc:'Activación y venta de pólizas cross-productos.', procs:['Cotizar','KYC','Emisión de póliza','Inspección vehicular','Vinculaciones','Legalización','Documentación onboarding'] },
  { block:'Engagement', c:R.blue,  icon:'💬', desc:'Momentos de verdad, touchpoints y comunicación durante la vigencia.', procs:['Journey cartera','Comunicaciones cartera, reclamaciones, asistencias, prestación','Reclamaciones','Asistencia / Prestación'] },
  { block:'Loyalty',    c:R.purp,  icon:'⭐', desc:'Cancelación, Modificaciones, Renovación, fidelización.', procs:['Renovaciones','Cancelaciones','Rehabilitación','Modificaciones'] },
  { block:'Evolutivos', c:R.coral, icon:'🔄', desc:'Mantiene y evoluciona lo que el ProcOwner regional entregó.', procs:['Mantenimiento por país','Evolución continua','Adaptaciones locales','Mejoras post-lanzamiento'] },
];
const STAGES = [
  { id:'c', num:1, label:'Conceptualizar', c:R.blue, loop:'Descubrir', outcome:'Análisis del cliente digital y sus necesidades enfocadas', que:{ ext:['Referentes digitales','Competidores','Mercado','Sujeto de Diseño'], int:['Cartera','Productos','Filiales','PQRS','Aprendizajes'] }, quien:['Equipo Producto','Equipo Growth','Proveedores','Contact centers','Capacidad filial','Canal Filial'], como:'Entender al cliente digital: ¿quién es el que compra?, ¿quien es el que disfruta el seguro?cómo piensa el que lo compra, qué busca, cómo se comporta, qué espera y cuál es su necesidad real enfocada.', profile:[{ t:'¿Quién es?', items:['25–49 años','Ciudades principales Tier 1','Vehículo 0–6 años'] },{ t:'¿Cómo decide?', items:['Cotizar → resolver','Seguros → Claridad','Asesor → Control'] },{ t:'¿Qué hace?', items:['No profundiza coberturas','Abandona ante fricción','Decide en minutos'] },{ t:'¿Qué dispara?', items:['Ver precio desde inicio','Entender en segundos','Cerrar sin ayuda'] }], norte:'Resuelve su vida sin fricciones', benchmark:['Rappi','Uber','Nu','Amazon'] },
  { id:'p', num:2, label:'Producto', c:R.purp, loop:'Definir', outcome:'Propuesta de valor digital al rededor de un producto', que:{ items:['Propuesta de valor en coberturas y planes','Políticas de suscripción','insights de como va a ser la venta','Tarifa','Estructura de reaseguro','Business Case','Nota técnica','Clausulado'] }, quien:['Equipo Producto','Equipo Growth','Capacidad','Tarifa','Canal Filial'], como:'Propuesta de valor integral para el cliente desde el producto hasta una primera versión de la experiencia, definiendo si se va a vender 100% digital o asistido o híbrido.', principios:[{ t:'Contratación simplificada', d:'Menos datos para comprar. Autocompletar cuando se tiene la información.' },{ t:'Precio técnico + elasticidad', d:'Configuración de tarifas dinámicas.' },{ t:'Diseño 100% digital', d:'Lenguaje claro, fácil comparación y recuperación de cotizaciones abandonadas.' },{ t:'Estructura modular', d:'Ajustes sin rediseñar el producto completo.' },{ t:'Suscripción tipo Netflix', d:'Fácil de contratar, modificar y cancelar.' }] },
  { id:'v', num:3, label:'Venta', c:R.teal, loop:'Construir', outcome:'Y la experiencia de compra del cliente', que:{ items:['Journey del cliente (Disney y MVP)','UX/UI','Comunicaciones y touchpoints','Hipótesis a testear','Medición de la experiencia','Campañas','Data y analítica','Operaciones'] }, quien:['Equipo Producto','Equipo Growth','Contact centers','Capacidad','Canal Filial'], como:'Experiencia completa que responda al cliente final. Proceso adaptable para aliados.', principios:[{ t:'Refinar la contratación', d:'Proceso regional.', badge:null },{ t:'3 planes + Personalización', d:'Simplificamos la decisión y evolucionamos planes con personalización.', badge:null },{ t:'Trazabilidad punta a punta', d:'Huella del 100% de los puntos de contacto. Info disponible a aliados.', badge:null },{ t:'Flujo sin interrupciones', d:'La inspección vehicular no rompe la experiencia.', badge:null },{ t:'Human support', d:'Click to call, Click to Wapp, call back en cotizadores.', badge:null }] },
  { id:'pv', num:4, label:'Postventa', c:R.coral, loop:'Medir + Evolucionar', outcome:'Y la experiencia punta a punta del cliente', que:{ items:['Procesos manuales cuales y por cuanto tiempo','Journey del cliente (Disney y MVP)','UX/UI','Comunicaciones y touchpoints','Hipótesis a testear','Medición de la experiencia','Data y analítica','Operaciones'] }, quien:['Equipo Producto','Equipo Growth','Contact centers','Capacidad','Canal Filial'], como:'Experiencia completa de los procesos que hacen parte del journey físico digital del cliente. Servicios para que aliados visualicen y gestionen sus clientes.', principios:[{ t:'Renovación simple y automática', d:'En un clic o automática según configuración.', badge:null },{ t:'Botón de cancelación', d:'En la landing del producto. Fácil pedir cancelación en conservación.', badge:null },{ t:'Siniestros Fast Track', d:'Resolución de siniestros comunes en 5 días hábiles.', badge:'Próximamente' },{ t:'Autogestionables', d:'Modificar, reclamar o gestionar de forma autónoma o con ayuda.', badge:'Próximamente' },{ t:'Plataforma integrada', d:'Cotización, compra, emisión, reclamación, cancelación, renovación: una sola plataforma.', badge:null },{ t:'Trazabilidad punta a punta', d:'Huella del 100% de los puntos de contacto. Info disponible a aliados.', badge:null }] },
];
const IXS = [
  { from:'Product Manager', fc:R.teal, to:'Business Owners', tc:R.amber, icon:'🔄', when:'Ciclo continuo: priorización de iniciativas, revisión de roadmap, decisiones basadas en impactos', ctx:'El PM y los BOs son socios comerciales: el BO trae la visión del negocio y el canal; el PM trae la realidad del producto y el backlog del equipo. El BO Canal Directo trae el foco del e-commerce y la conversión digital; el BO Afinidades trae la voz de bancos, asesores y aliados. Misma dinámica de sociedad, diferente lente comercial.', gives:["Estado del roadmap ('esto está / hoy no está')",'Backlogl del equipo','Timelines honestos','Decisiones de priorización basadas en impactos'], gets:['Iniciativas con contexto de negocio (canal directo o afinidades)','Urgencias del canal','Señales del mercado','Retroalimentación sobre lo ya lanzado'] },
  { from:'Product Manager', fc:R.teal, to:'Líderes Cluster BU', tc:R.purp, icon:'🗂', when:'Priorización por cluster, planeación de releases, seguimiento de iniciativas', ctx:'El PM y los líderes de cluster son socios de priorización: juntos, con el CM, deciden qué entra al portafolio y en qué orden. El PM tiene el mapa completo — sabe qué tiene cada producto, cómo está el backlog y cómo se podría secuenciar cuando una iniciativa toca varios productos a la vez. Para responder, consulta a los POs de los productos involucrados', gives:['Mapa de disponibilidad cross-producto','Status de backlogs','Timelines consolidados del portafolio','Decisiones de priorización explicadas'], gets:['Iniciativas y prioridades del cluster','Señales del campo','Feedback post-entrega'] },
  { from:'Product Owners', fc:R.purp, to:'Líderes Cluster BU', tc:R.purp, icon:'✅', when:'UAT, demos de sprint, validación de outcomes del producto', ctx:'El PO responde por el resultado del producto frente a la BU — no por las prioridades del portafolio, que son territorio del PM. Cuando la BU valida una entrega, lo hace con el PO porque él es quien conoce el producto en profundidad. Esta validación es comercial y funcional: ¿resuelve el problema que se planteó?', gives:['Visibilidad del estado del producto','Validación de outcomes vs. expectativas del negocio','Métricas de adopción y resultado'], gets:['Validación comercial del delivery','Casos de uso reales del canal','Señales de lo que el producto aún no resuelve'] },
  { from:'Product Owners', fc:R.purp, to:'Project Managers', tc:R.gray, icon:'⚙️', when:'Discovery, Refinamientos, planning de sprint, validación de outcomes', ctx:'El PO es el líder desde producto en el squad: define/orquesta lo que se construye, por qué importa y valida que lo entregado resuelve el problema. El Project Manager es el socio de ejecución: organiza la mecánica del squad, gestiona la capacidad y alerta cuando algo amenaza el delivery. El liderazgo es complementario — el PO lidera la dirección del producto, el Project Manager facilita la ejecución. Ninguno subordinado al otro.', gives:['Visión y prioridades del producto','Insumos de caldiad para los refinamientos y plannings de sprints, sea que los construya o que los orqueste','Criterios de éxito desde el negocio','Validación de outcomes (no solo funcionalidad)','Decisiones sobre qué entra y qué no al sprint'], gets:['Capacidad real del squad','Estimaciones, release plan y factibilidad técnica','Alertas de bloqueos o deuda técnica','Estado real de la ejecución'] },
  { from:'Business Owners', fc:R.amber, to:'Product Owners', tc:R.purp, icon:'✏️', when:'Discovery, UAT y validación comercial de features antes y despues de lanzar', ctx:'El BO y el PO son socios de producto-negocio: el BO trae el por qué comercial — qué debe lograr la feature para el canal — y el PO trae el qué es posible y cuándo. El momento más crítico de esta sociedad es la validación en UAT: el BO no valida solo que funciona, sino que resuelve el problema comercial que planteó. Sin esa validación conjunta, se entrega algo funcionalmente correcto pero comercialmente irrelevante.', gives:['Contexto comercial del canal','Criterios de éxito desde el negocio','Prioridades desde información primaria recoletada en campo','Feedback de aliados o usuarios sobre lo ya lanzado'], gets:['Qué es factible y en qué sprint','Cómo se está usando el producto (analytics)','Trade-offs entre lo pedido y el backlog, de acuerdo a impactos'] },
  { from:'Process Owners', fc:R.coral, to:'Project Managers', tc:R.gray, icon:'🔗', when:'Discovery, Refinamientos, Plannings a demanda, Automatizaciones, integraciones, flujos de procesos', ctx:'El Process Owner y el Project Manager son socios de implementación: el Process Owner diseña y especifica el punta a punta del proceso; el Project Manager lo implementa técnicamente. Sin esta sociedad, el producto existe pero no opera — el feature llega sin el flujo que lo sostiene.', gives:['Especificaciones y flujos de procesos AS-IS y TO-BE','Reglas de negocio','Casos de prueba operativos'], gets:['Implementación de flujos','Logs y trazabilidad','Alertas cuando el proceso no se puede automatizar como se especificó'] },
  { from:'Process Owners', fc:R.coral, to:'Country Manager', tc:R.blue, icon:'📋', when:'Pre-lanzamiento, configuración local, post-mortem', ctx:'El Process Owner y el Country Manager son socios de aterrizaje: el Process Owner llega con el playbook operativo diseñado; el CM aporta las particularidades regulatorias y comerciales del país que el playbook no puede anticipar desde lo regional. Juntos ajustan antes del lanzamiento, y durante.', gives:['Playbook operativo por país','Checklist de lanzamiento','Flujos manuales y automáticos adaptados al mercado'], gets:['Particularidades regulatorias locales','Comportamiento real de aliados en el país','Retroalimentación post-lanzamiento'] },
  { from:'Country Manager', fc:R.blue, to:'Product Manager', tc:R.teal, icon:'✅', when:'Aprobación de backlog · revisión de hoja de ruta · negociación de prioridades y alcance', ctx:'El PM y el Country Manager son socios de expansión. El CM vela por el backlog completo del país. Toda iniciativa — venga del BO, del PM, del PO, de la BU o de un Process Owner — debe tener su aprobación antes de entrar al backlog. EL CM y el PM negocian con lo que el PO tiene priorizado en su backlog, Cuando el PO hace una contrapropuesta, negocian el balance en cuanto a impactos de negocio, entre lo que el país necesita y lo que el producto tenia como prioridades. El PM le presenta una hoja de ruta clara para aterrizar las necesdiades del país, al CM: qué se entrega, cuándo y cómo se medirá el éxito. El CM no suelta el control hasta tener esa claridad. ', gives:['Iniciativas y prioridades del país','Criterios de éxito desde la perspectiva del país','Prioridades comerciales y regulatorias locales','Ajustes al país tras la contrapropuesta del PO'], gets:['Hoja de ruta de implementación clara: qué, cuándo y con quién','Contrapropuesta del PO con alcance y timelines reales','Cómo se medirá el éxito en el país'] },
  { from:'Country Manager', fc:R.blue, to:'Product Owners', tc:R.purp, icon:'🔍', when:'Revisiones periódicas, validación de outcomes, negociación de delays, transmisión de señales de negocio', ctx:'El CM no se aleja del producto. Aunque el PM es su interlocutor principal de priorización, el CM mantiene contacto directo con los POs: entiende el estado real del producto en su mercado, valida que los outcomes esperados se están cumpliendo y trae señales del cliente que el PM no siempre captura. Esta relación es de observación y validación — no de asignación de prioridades ni de gestión del backlog. El PO escucha al CM, pero priorizan en conjunto con el PM.', gives:['Señales del campo y del cliente local','Validación de si el producto resuelve el problema en el mercado','Contexto regulatorio y comercial específico del país'], gets:['Estado real del backlog del producto en el país','Métricas de adopción y resultado','Alertas tempranas de lo que no está funcionando localmente'] },
];
const CLUSTERS = [
  { id:'venta', label:'Venta', c:R.teal, leader:'Catherine Tobón', desc:'Cotización y compra de nuevos seguros.', kpi:{ main:'Ventas Nuevas ($ y Cantidad)', int:['%SR','Cantidad de Leads','%Migración Venta'] }, squads:[
    { n:'Inconsistencias Cotizador',      q:'Q1', po:'Juli A',          pm:'Xime', items:[] },
    { n:'Ajuste tarifa AD',               q:'Q1', po:'Ana Cano',        pm:'Daya', items:[] },
    { n:'API Vehicular',                  q:'Q1', po:'Juli A',          pm:'Xime', items:[] },
    { n:'Traspaso de propiedad',          q:'Q1', po:'Juli A',          pm:'Xime', items:[] },
    { n:'Módulo de Descuentos',           q:'Q2', po:'Por asignar',     pm:'—',    items:[] },
    { n:'Referidos',                      q:'Q2', po:'Por asignar',     pm:'—',    items:[] },
    { n:'Mejoras Landings y Cotizadores', q:'Q2', po:'Luce/Lau Molano', pm:'Daya', items:[] },
    { n:'Nuevo Plan de Autos',            q:'Q2', po:'Lau García',      pm:'—',    items:[] },
    { n:'Pequeños Eventos Motos',         q:'Q2', po:'Juli A',          pm:'Xime', items:[] },
  ]},
  { id:'post', label:'Posventa', c:R.purp, leader:'Luisa F. Cardona', desc:'Cancelaciones, renovaciones y reclamaciones.', kpi:{ main:'Renovaciones ($ y Cantidad)', int:['% Vigentes en Reno','% RR'] }, squads:[
    { n:'Cancelaciones AD, Autos, Motos',  q:'Q1', po:'Diana Caro B', pm:'Daya', items:[] },
    { n:'Renovaciones AD',                 q:'Q1', po:'Diana Caro B', pm:'Daya', items:[] },
    { n:'Renovaciones Movilidad sin Pago', q:'Q1', po:'Cin',          pm:'Daya', items:[] },
    { n:'Reclamaciones AD',                q:'Q2', po:'Cin',          pm:'Daya', items:[] },
  ]},
  { id:'mem', label:'Membresía', c:R.blue, leader:'Carolina Hdez', desc:'Retención y activación vía débito y membresía.', kpi:{ main:'% Cancelación por no pago', int:['% Usuarios con Membresía'] }, squads:[
    { n:'Journey de Cartera',    q:'Q1', po:'Cin',  pm:'Daya', items:[] },
    { n:'Evolutivos Membresía',  q:'Q1', po:'Luce', pm:'Daya', items:[] },
    { n:'Pago Express',          q:'Q1', po:'Cin',  pm:'Daya', items:[] },
  ]},
  { id:'new', label:'Nuevos Productos', c:R.amber, leader:'Eliana Quinchia', desc:'Incubación de nuevas líneas.', kpi:{ main:'Ventas Nuevas Soluciones ($ y Cantidad)', int:['%Leads','%SR'] }, squads:[
    { n:'Asesoría y Venta Salud Animal',   q:'Q1', po:'Juli Aleman', pm:'Xime', items:[] },
    { n:'Posventa Salud Animal',           q:'Q2', po:'Juli Aleman', pm:'Xime', items:[] },
    { n:'Asesoría y Venta Salud para Dos', q:'Q2', po:'Milady',      pm:'Daya', items:[] },
    { n:'Producto y venta rediseño carros',q:'Q3', po:'Lau García',  pm:'Xime', items:[] },
  ]},
  { id:'analitica', label:'Analítica', c:R.pink, leader:'Juan D. Taborda', desc:'Analytics, datos y amplificación.', kpi:{ main:'Por definir', int:[] }, squads:[] },
];
const MONTHS = ['May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr'];
const GPHASES = ['Diseño','Discovery','Implementación','Diseño/implem','Definiciones'];
const FOPACITY = { 'Diseño':0.45, 'Discovery':0.7, 'Implementación':1, 'Diseño/implem':0.6, 'Definiciones':0.35, '':0.2 };
let _id = 0;
const uid = () => String(++_id);
const h2r = (h,a) => { const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return `rgba(${r},${g},${b},${a})`; };
const INIT_P = [
  { id:'p1', name:'PO Lau García',              color:'#4EA72E', li:'#D6EFCB', da:'#2D6A18' },
  { id:'p2', name:'ProcOwner Engagement Cin',   color:'#156082', li:'#C5DCE8', da:'#0A3A50' },
  { id:'p3', name:'ProcOwner Loyalty Caro B',   color:'#A02B93', li:'#EAC4E6', da:'#641A5C' },
  { id:'p4', name:'Sin asignar',                color:'#888780', li:'#E8E6E0', da:'#444441' },
  { id:'p5', name:'PO Juli Alemán',             color:'#BA7517', li:'#FAD99A', da:'#7A4D0E' },
  { id:'p6', name:'PO Mila',                    color:'#0F9ED5', li:'#C2E8F7', da:'#0A6A8F' },
  { id:'p7', name:'ProcOwner Onboarding Mauro', color:'#1D9E75', li:'#9FE1CB', da:'#0F6E56' },
  { id:'p8', name:'ProcOwner Evolutivos Pipe',  color:'#D85A30', li:'#F5C4B3', da:'#993C1D' },
];
const INIT_G = [
  { id:'g1', label:'Salud Animal', tribe:'🇨🇴', items:[
    { id:'i1', sub:'Venta',     label:'Cancelación',    person:'p1', bars:[{m:1,p:'Diseño'},{m:2,p:'Discovery'},{m:3,p:'Implementación'}] },
    { id:'i2', sub:'Venta',     label:'Modif. valorable',person:'p1', bars:[{m:2,p:'Diseño'},{m:3,p:'Diseño'},{m:4,p:'Discovery'}] },
    { id:'i3', sub:'Venta',     label:'Reclamaciones',  person:'p2', bars:[{m:2,p:'Diseño'},{m:3,p:'Diseño'},{m:4,p:'Discovery'}] },
    { id:'i4', sub:'Postventa', label:'Renovaciones',   person:'p1', bars:[{m:4,p:'Diseño'},{m:5,p:'Discovery'},{m:6,p:'Implementación'}] },
  ]},
  { id:'g2', label:'Chile Autos', tribe:'🇨🇱', items:[
    { id:'i5', sub:'Venta',     label:'Cancelación',    person:'p3', bars:[{m:0,p:'Diseño'},{m:1,p:'Discovery'},{m:2,p:'Implementación'},{m:3,p:'Implementación'},{m:4,p:'Implementación'},{m:5,p:'Implementación'}] },
    { id:'i6', sub:'Venta',     label:'Rehab',          person:'p3', bars:[{m:0,p:'Diseño'},{m:1,p:'Discovery'},{m:2,p:'Implementación'},{m:3,p:'Implementación'}] },
    { id:'i7', sub:'Postventa', label:'Renovaciones',   person:'p4', bars:[] },
  ]},
  { id:'g3', label:'Arriendo', tribe:'🇨🇴', items:[
    { id:'i8',  sub:'Postventa', label:'Reclamaciones',  person:'p2', bars:[{m:0,p:'Diseño'},{m:1,p:'Diseño/implem'},{m:2,p:'Diseño/implem'},{m:3,p:'Diseño/implem'}] },
    { id:'i9',  sub:'Evolutivos',label:'Evol reno',      person:'p1', bars:[{m:2,p:'Diseño'}] },
    { id:'i10', sub:'Evolutivos',label:'Journey cartera',person:'p2', bars:[{m:1,p:'Definiciones'}] },
    { id:'i11', sub:'Nuevos',    label:'Salud para dos', person:'p4', bars:[{m:0,p:'Diseño'},{m:1,p:'Diseño'},{m:2,p:'Discovery'}] },
  ]},
];
const FLOW_STEPS = [
  { phase:'Priorización y negociación', c:R.blue, loop:false, steps:[
    { n:1, l:'Toda iniciativa — venga del BO, del PM, del PO, de la BU o de un Process Owner debe pasar por el CM. EL CM trae a la mesa las necesidades y negocia con el PM y el PO con lo que el PO tiene priorizado en su backlog.', actors:[['CM','teal'],['BU','purp'],['PM','teal']] },
    { n:2, l:'PM traslada las prioridades del CM al PO del producto involucrado. El PO recibe el contexto completo del por qué comercial y del país.', actors:[['PM','teal'],['PO','purp']] },
    { n:3, l:'El PO recibe el contexto completo del por qué comercial y del país. El PO es dueño de su backlog de features y mejoras intrínsecas del producto. Conoce la deuda técnica, las dependencias y el ritmo real del squad. Su contrapropuesta puede ajustar alcance, secuencia o timelines — sin perder el objetivo del CM. Cuando el PO hace una contrapropuesta, negocian el balance en cuanto a impactos de negocio, entre lo que el país necesita y lo que el producto tenia como prioridades. ', actors:[['PO','purp'],['PM','teal']] },
    { n:4, l:'PM y PO a demanda negocian con CM y BO: presenta la contrapropuesta y cierra el acuerdo. El PM lleva la contrapropuesta del PO al CM y al BO. Aquí se negocia el balance entre lo que el país necesita (CM), lo que el canal pide (BO) y lo que el producto puede entregar (PO). El PM traduce, media y cierra un acuerdo realista. Sin acuerdo, no se asigna squad.', actors:[['PM','teal'],['CM','blue'],['BO','amber'],['PO','teal']] },
    { n:5, l:'PM y PO y Process a demanda construyen la hoja de ruta de implementación para el CM. La hoja de ruta incluye: qué se entrega, timelines honestos, qué POs y process estarían involucrados y cómo se medirá el éxito en el país. Sin este documento el CM no aprueba.', actors:[['PM','teal'],['CM','blue'],['PO','teal']] },
    { n:6, l:'El CM puede aprobar, rechazar o pedir ajustes. No suelta el control hasta tener claridad total sobre el impacto esperado en el mercado.', actors:[['CM','blue'],['PM','teal']] },

    { n:7, l:'Asignar el squad que va a trabajar la iniciativa', actors:[['ProgramM','teal'],['LiderP&P','purp']], manual:null },
    { n:8, l:'Entra la iniciativa al backlog del squad con el alcance acordado', actors:[['PM','teal'],['ProjectM','teal']] },
  ]},
  { phase:'Arranque', c:R.amber, loop:false, steps:[
    { n:9,  l:'Planeación inicial: cómo se abordará la iniciativa', actors:[['PO','purp'],['equipo P&P','teal']], manual:'Se define qué se espera de cada equipo y los pasos a seguir. El aliado recibe contexto y el PM queda al tanto.' },
    { n:10, l:'Reunión de kick-off: contexto a alto nivel y cómo se va a trabajar', actors:[['PO','purp'],['PM','teal'],['Squad','gray'],['Aliado','amber'],['BU','teal']], manual:null },
  ]},
  { phase:'Diseño y Discovery', c:R.teal, loop:false, steps:[
    { n:11, l:'Diseño del proceso o iniciativa a alto nivel', actors:[['PO','purp'],['ProcOwner','coral']], manual:null },
    { n:12, l:'Refinamiento del equipo técnico a alto nivel', actors:[['PO','purp'],['Squad técnico','gray']], manual:null },
    { n:13, l:'Discovery (primera vez) o estimación técnica del equipo', actors:[['PO','purp'],['Squad técnico','gray'],['PM','teal']], manual:'La estimación indica cuántos sprints hay y qué se entrega en cada uno. Esta estimación la recibe el aliado y el PM. Si es proceso manual, la estimación se saca con los equipos encargados de ejecutarlo.' },
  ]},
  { phase:'Plan de trabajo', c:R.purp, loop:false, steps:[
    { n:14, l:'Construcción del plan de trabajo y proyección de sprints', actors:[['PO','purp'],['PM','teal'],['Squad técnico','gray']], manual:'Si es proceso manual, el plan se concreta con los equipos encargados de ejecutar el proceso.' },
  ]},
  { phase:'Construcción · se repite por cada sprint', c:R.coral, loop:true, steps:[
    { n:15, l:'Se escriben las historias de usuario del sprint', actors:[['PO','purp']], manual:'Si es proceso manual: se escribe el instructivo o se detalla completamente el proceso.' },
    { n:16, l:'Se refinan las HUs con el equipo técnico con detalle', actors:[['PO','purp'],['Squad técnico','gray']], manual:'Si es proceso manual: se refina el instructivo con los involucrados y encargados de ejecutarlo.' },
    { n:17, l:'Se refinan las HUs con el equipo técnico de ST si es necesario', actors:[['PO','purp'],['Squad técnico','gray']], manual:'Si es proceso manual: se refina con el equipo técnico si es necesario.' },
    { n:18, l:'La HU entra a planning y se desarrolla', actors:[['Squad técnico','gray'],['PO','purp']], manual:null },
    { n:19, l:'Seguimiento a la proyección de sprints', actors:[['PM','teal'],['PO','purp']], manual:null },
  ]},
  { phase:'Validación', c:R.green, loop:false, steps:[
    { n:20, l:'Demo con el squad completo — se evidencia lo construido', actors:[['PO','purp'],['PM','teal'],['BU','purp'],['Squad','gray']], manual:'En la demo salen ajustes o pueden no salir. Para proceso manual también debe haber una demo que se entrega al contact o a los equipos encargados.' },
    { n:21, l:'Se realizan ajustes con las HUs requeridas', actors:[['PO','purp'],['Squad técnico','gray']], manual:null },
    { n:22, l:'Se hacen pruebas internas', actors:[['PO','purp'],['Squad técnico','gray'],['PM','teal']], manual:null },
  ]},
  { phase:'Producción', c:R.blue, loop:false, steps:[
    { n:23, l:'Verificación y Go para el paso a producción', actors:[['PO','purp'],['PM','teal'],['BU','purp']], manual:'Para proceso manual: en espacios previos se obtiene el Go, se definen y aceptan características y flujo. Se entrega el UX al equipo encargado.' },
    { n:24, l:'Despliegue en producción', actors:[['Squad técnico','gray'],['PO','purp']], manual:'Para proceso manual: el despliegue es el momento en que el equipo empieza a ejecutar el proceso.' },
    { n:25, l:'Estadística y seguimiento post-lanzamiento', actors:[['PM','teal'],['PO','purp'],['BU','purp']], manual:null },
  ]},
];
const AC = {
  teal:  { bg:R.teal.bg,  color:R.teal.da  },
  purp:  { bg:R.purp.bg,  color:R.purp.da  },
  coral: { bg:R.coral.bg, color:R.coral.da },
  gray:  { bg:R.gray.bg,  color:R.gray.da  },
  amber: { bg:R.amber.bg, color:R.amber.da },
  green: { bg:R.green.bg, color:R.green.da },
  blue:  { bg:R.blue.bg,  color:R.blue.da  },
};

/* ════════════ EQUIPO ════════════ */
function SecEquipo() {
  return (
    <div>
      <Sec n="1" t="Roles del equipo" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 }}>
        {[
          { t:'Product Manager', c:R.teal, icon:'🗺', d:'Visión horizontal del portafolio. Centraliza con la BU y tiene el mapa completo de todos los productos. Apoya a los PO en cuanto a cómo secuenciar cuando una iniciativa toca varios productos a la vez.', items:['Roadmap estratégico del portafolio',' interlocutor principal de la BU desde producto','Soporte en priorización cross-producto','Go-to-market de las soluciones y pilotos'] },
          { t:'Product Owners', c:R.purp, icon:'⬡', d:'Visión vertical del producto. Dueños de su backlog y lo priorizan ya que saben exactamente qué necesita su producto — venta, postventa o evolución de features. Estapriprización luego es la que se negocia con el PM, CM, de acuerdo a lo que solicita la BU y otros stakehoders', items:['Ownership completo del producto (venta + postventa) apoyados en información proporcionada por growth y procesos','Backlog propio con criterio propio','Líder desde producto del squad','Validación de outcomes de negocio, como el stock, para medir la salud de sus productos'] },
          { t:'Process Owners', c:R.coral, icon:'⚙', d:'Por bloques (Onboarding, Engagement, Loyalty, Evolutivos). Cross-productos en la tribu.', items:['Mapeo y mejora BPM','Ownership completo del proceso','Automatización','Replicación cross-tribus','Evolutivos en tribu','Validación de outcomes de eficiencias'] },
        ].map(r => (
          <Card key={r.t} style={{ borderTop:`4px solid ${r.c.mi}` }}>
            <div style={{ width:36, height:36, borderRadius:10, background:r.c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, marginBottom:12 }}>{r.icon}</div>
            <div style={{ fontFamily:font, fontSize:14, fontWeight:800, color:S.navy, marginBottom:5 }}>{r.t}</div>
            <p style={{ fontSize:12, color:S.muted, lineHeight:1.6, marginBottom:10 }}>{r.d}</p>
            {r.items.map(i => <div key={i} style={{ fontSize:11, color:S.text, paddingLeft:13, position:'relative', marginBottom:3 }}><span style={{ position:'absolute', left:0, color:r.c.mi, fontSize:9, top:2 }}>→</span>{i}</div>)}
          </Card>
        ))}
      </div>
      <PersonRow name={PM_PERSON.name} color={PM_PERSON.color} prods={PM_PERSON.prods} badge="Product Manager" sx={{ marginBottom:24 }} />
      <Sec n="2" t="Product Owners · por producto" />
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
        {PO_LIST.map(po => <PersonRow key={po.name} name={po.name} color={po.color} prods={po.prods} />)}
      </div>
      <Sec n="3" t="Process Owners · por bloque de proceso" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:24 }}>
        {PROC_BLOCKS.map(b => (
          <Card key={b.block} style={{ borderTop:`4px solid ${b.c.mi}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}><span style={{ fontSize:18 }}>{b.icon}</span><span style={{ fontFamily:font, fontSize:13, fontWeight:800, color:S.navy }}>Process Owner {b.block}</span></div>
            <p style={{ fontSize:11, color:S.muted, lineHeight:1.55, marginBottom:8 }}>{b.desc}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>{b.procs.map(p => <span key={p} style={{ fontSize:9, fontWeight:600, padding:'2px 8px', borderRadius:20, background:b.c.bg, color:b.c.da }}>{p}</span>)}</div>
          </Card>
        ))}
      </div>
      <Sec n="4" t="Métricas North Star" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
        {[
          { v:'TTM',  l:'Time to market',            d:'Velocidad de entrega de features críticas.', como:'Días entre "feature aprobada en backlog" y "feature en producción"', frec:'Por release · revisión mensual', meta:'< 45 días' },
          { v:'OE %', l:'Eficiencia operativa',      d:'Reducción de fricción + Optimización en procesos manuales y core.', como:'(Pasos/tiempo/valor del proceso actual / Pasos/tiempo/valor del proceso original) × 100', frec:'Trimestral por bloque de proceso', meta:'> 70 %' },
          { v:'ERI',  l:'Expansion readiness',       d:'Índice de madurez para nuevos mercados.', como:'Checklist: procesos documentados + features disponibles + playbook listo. Cada ítem = 1 punto sobre 10', frec:'Antes de cada nuevo mercado', meta:'≥ 8 / 10' },
          { v:'CStP', l:'Crecimiento stock pólizas', d:'Métrica de negocio: crecimiento neto del stock de pólizas vigentes — salud del portafolio.', como:'(Pólizas vigentes fin período − Pólizas vigentes inicio período) ÷ Pólizas vigentes inicio × 100', frec:'Mensual · revisión trimestral por producto', meta:'> 5 % mensual' },
        ].map(m => <MetricCard key={m.l} {...m} />)}
      </div>
    </div>
  );
}

/* ════════════ METODOLOGÍA ════════════ */
function SecMetodo() {
  const [sid, setSid] = useState('c');
  const [vw, setVw] = useState('que');
  const s = STAGES.find(x => x.id === sid);
  return (
    <div>
      <div style={{ background:S.navy, borderRadius:14, padding:'22px 24px', marginBottom:20, color:S.white }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:8 }}>Metodología de diseño · El aporte de SuraTech a sus clientes B2B</div>
        <div style={{ fontFamily:font, fontSize:20, fontWeight:900, lineHeight:1.2, marginBottom:8 }}>Del cliente al producto:<br />4 etapas que crean valor real</div>
        <p style={{ fontSize:12, color:'rgba(255,255,255,.7)', lineHeight:1.75, margin:0 }}>No solo construimos producto — diseñamos experiencias completas partiendo del cliente digital, pasando por el producto, la venta y la postventa.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:18 }}>
        {STAGES.map(st => { const a = sid===st.id; return (
          <button key={st.id} onClick={() => { setSid(st.id); setVw('que'); }} style={{ border:a?'none':`1px solid ${S.border}`, borderRadius:12, padding:'14px 8px', cursor:'pointer', background:a?S.navy:S.card, transition:'all .2s' }}>
            <div style={{ width:26, height:26, borderRadius:'50%', background:a?S.yellow:S.light, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px' }}><span style={{ fontFamily:font, fontSize:12, fontWeight:900, color:a?S.navy:S.blue }}>{st.num}</span></div>
            <div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:a?S.white:S.navy }}>{st.label}</div>
            <div style={{ fontSize:9, color:a?'rgba(255,255,255,.5)':S.muted, marginTop:3 }}>{st.loop}</div>
          </button>
        ); })}
      </div>
      <div style={{ background:s.c.bg, borderRadius:10, padding:'10px 16px', marginBottom:14, display:'flex', alignItems:'center', gap:10, border:`1px solid ${s.c.li}` }}>
        <div style={{ width:24, height:24, borderRadius:'50%', background:S.yellow, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontFamily:font, fontSize:11, fontWeight:900, color:S.navy }}>{s.num}</span></div>
        <span style={{ fontSize:13, fontWeight:700, color:s.c.xd||s.c.da, lineHeight:1.4 }}>{s.outcome}</span>
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:14 }}>
        {[['que','¿Qué? / ¿Quiénes? / ¿Cómo?'],['prin', sid==='c'?'Perfil del cliente':'Principios de diseño']].map(([v,l]) => (
          <button key={v} onClick={() => setVw(v)} style={{ border:vw===v?'none':`1px solid ${S.border}`, borderRadius:20, padding:'6px 14px', cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:font, background:vw===v?S.blue:S.card, color:vw===v?S.white:S.muted, transition:'all .15s' }}>{l}</button>
        ))}
      </div>
      {vw==='que' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
          <Card>
            <div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.blue, marginBottom:10 }}>¿Qué?</div>
            {s.que.ext && <><div style={{ fontSize:9, fontWeight:700, color:S.muted, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:5 }}>Externo</div>{s.que.ext.map(q=><Dot key={q} c={s.c.mi} n={q}/>)}<div style={{ fontSize:9, fontWeight:700, color:S.muted, textTransform:'uppercase', letterSpacing:'.06em', margin:'7px 0 5px' }}>Interno</div>{s.que.int.map(q=><Dot key={q} c={s.c.da} n={q}/>)}</>}
            {s.que.items && s.que.items.map(q=><Dot key={q} c={s.c.mi} n={q}/>)}
          </Card>
          <Card><div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.blue, marginBottom:10 }}>¿Quiénes?</div>{s.quien.map(q=><Dot key={q} c={s.c.mi} n={q}/>)}</Card>
          <Card><div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.blue, marginBottom:10 }}>¿Cómo?</div><p style={{ fontSize:12, color:S.text, lineHeight:1.7, margin:0 }}>{s.como}</p></Card>
        </div>
      )}
      {vw==='prin' && sid==='c' && (
        <div style={{ marginBottom:16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:12 }}>
            {s.profile.map(b => (<Card key={b.t} style={{ padding:'12px 12px', borderTop:`3px solid ${S.blue}` }}>
              <div style={{ fontFamily:font, fontSize:10, fontWeight:800, color:S.navy, marginBottom:7 }}>{b.t}</div>
              {b.items.map(it => <div key={it} style={{ fontSize:10, color:S.text, paddingLeft:10, position:'relative', marginBottom:3 }}><span style={{ position:'absolute', left:0, color:S.mid, fontSize:8, top:2 }}>●</span>{it}</div>)}
            </Card>))}
          </div>
          <div style={{ background:S.navy, borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
            <div><div style={{ fontSize:10, color:'rgba(255,255,255,.45)', fontWeight:600, marginBottom:3 }}>Norte del cliente</div><div style={{ fontFamily:font, fontSize:16, fontWeight:900, color:S.white }}>{s.norte}</div></div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{s.benchmark.map(b=><span key={b} style={{ fontSize:11, fontWeight:700, color:S.white, padding:'3px 10px', borderRadius:20, background:'rgba(255,255,255,.12)' }}>{b}</span>)}</div>
          </div>
        </div>
      )}
      {vw==='prin' && sid!=='c' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
          {s.principios.map(p => (<Card key={p.t}>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:S.yellow, border:`2px solid ${S.blue}`, flexShrink:0 }} />
              <span style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.navy, flex:1 }}>{p.t}</span>
              {p.badge && <span style={{ fontSize:8, fontWeight:700, padding:'2px 8px', borderRadius:20, background:S.yelBg, color:S.navy, flexShrink:0 }}>{p.badge}</span>}
            </div>
            <p style={{ fontSize:11, color:S.muted, lineHeight:1.6, margin:0, paddingLeft:15 }}>{p.d}</p>
          </Card>))}
        </div>
      )}
      <Banner><span style={{ fontSize:14 }}>↻</span><span style={{ fontSize:11, color:S.blue, lineHeight:1.6 }}>Esta etapa vive en el loop operativo en la fase de <strong>{s.loop}</strong>. Los Fundamentales (<em>Escuchamos / Construimos / Aprendemos</em>) son el ADN que la atraviesa.</span></Banner>
    </div>
  );
}

/* ════════════ FUNDAMENTALES ════════════ */
function SecFund() {
  const FD = [
    { t:'Escuchamos', tag:'Empatía radical', c:R.teal, phase:'Descubrir', items:['Personas primero, siempre','Los dolores mandan','Espiamos sin sesgarnos','Nos metemos hasta la cocina','Diseño con propósito'] },
    { t:'Construimos', tag:'El producto sin el proceso no existe', c:R.purp, phase:'Definir + Construir', items:['Experiencias digitales punta a punta','Simplicidad sin sacrificios','Reglas claras, juego libre','Precio justo, ni más ni menos','Lo construimos juntos'] },
    { t:'Aprendemos', tag:'El diseño está vivo', c:R.coral, phase:'Medir', items:['Diseño que aprende','Funciona o no funciona','Medimos la experiencia como si fuera el negocio','Una queja es un regalo'] },
  ];
  return (
    <div>
      <Banner><span style={{ fontSize:16, flexShrink:0 }}>🧬</span><p style={{ fontSize:12, color:S.blue, lineHeight:1.7, margin:0, fontWeight:500 }}><strong>Escuchamos</strong> define cómo descubrimos. <strong>Construimos</strong> define cómo entregamos. <strong>Aprendemos</strong> define cómo mejoramos.</p></Banner>
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
        {FD.map(f => (
          <Card key={f.t} style={{ overflow:'hidden', padding:0 }}>
            <div style={{ display:'grid', gridTemplateColumns:'180px 1fr' }}>
              <div style={{ background:f.c.mi, padding:'20px 18px' }}>
                <div style={{ fontFamily:font, fontSize:20, fontWeight:900, color:S.white, marginBottom:4 }}>{f.t}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.75)', fontStyle:'italic', marginBottom:14, lineHeight:1.4 }}>{f.tag}</div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,.15)', padding:'4px 10px', borderRadius:20 }}><div style={{ width:5, height:5, borderRadius:'50%', background:S.yellow }} /><span style={{ fontSize:9, fontWeight:700, color:S.white }}>{f.phase}</span></div>
              </div>
              <div style={{ padding:'20px 18px' }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', color:S.muted, marginBottom:12 }}>Principios</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {f.items.map(it => <div key={it} style={{ display:'flex', gap:7, fontSize:11, color:S.text, lineHeight:1.5 }}><div style={{ width:14, height:14, borderRadius:4, background:f.c.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}><div style={{ width:5, height:5, borderRadius:'50%', background:f.c.mi }} /></div>{it}</div>)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Sec n="2" t="Integración en el loop operativo" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
        {[{ emoji:'🔍', fase:'Descubrir', fund:'Escuchamos', c:R.blue },{ emoji:'✏️', fase:'Definir', fund:'Construimos', c:R.purp },{ emoji:'🔨', fase:'Construir', fund:'Construimos', c:R.teal },{ emoji:'📊', fase:'Medir', fund:'Aprendemos', c:R.coral }].map(p => (
          <Card key={p.fase} style={{ textAlign:'center', padding:'16px 10px', borderTop:`4px solid ${p.c.mi}` }}>
            <div style={{ fontSize:20, marginBottom:8 }}>{p.emoji}</div>
            <div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.navy, marginBottom:4 }}>{p.fase}</div>
            <div style={{ fontSize:10, color:p.c.mi, fontWeight:700 }}>{p.fund}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ════════════ TRIBUS ════════════ */
function SecTribus() {
  return (
    <div>
      <Banner bg={S.xlight}><span style={{ fontSize:18, flexShrink:0 }}>🌎</span><p style={{ fontSize:12, color:S.blue, lineHeight:1.75, margin:0, fontWeight:500 }}>La insurtech opera por <strong>tribus</strong> (una por país). Los <strong>Product Owners son transversales</strong> a los squads que toquen sus productos. El product regional implementa sus productos por primera vez y los replica en otras tribus. Los <strong>Process Owners</strong> operan por bloques cross-productos. El process regional replica sus procesos en las otras tribus, el de evolutivos evoluciona lo implementado.</p></Banner>
      <Sec n="1" t="Estructura de tribus" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:24 }}>
        {[{ label:'Tribu Regional', c:R.purp, icon:'🌐', role:'Diseña', d:'Diseña procesos y productos en versión transversal. Primera referencia para todas las tribus.' },{ label:'Tribu Colombia', c:R.teal, icon:'🇨🇴', role:'Implementa + Evoluciona', d:'Primera implementación según lo que lleva ST de historia. Desarrolla con el Product Owner regional. Mantiene con el de Evolutivos.' },{ label:'Tribu Chile', c:R.blue, icon:'🇨🇱', role:'Replica + Implementa según el producto', d:'Recibe el proceso validado en Colombia. El Process Owner regional replica el modelo probado. También puede darse que Tribu Chile implemente algo por primera vez y Col lo replique.' }].map(t => (
          <Card key={t.label} style={{ borderTop:`4px solid ${t.c.mi}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}><span style={{ fontSize:22 }}>{t.icon}</span><div><div style={{ fontFamily:font, fontSize:13, fontWeight:800, color:S.navy }}>{t.label}</div><span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:t.c.bg, color:t.c.da }}>{t.role}</span></div></div>
            <p style={{ fontSize:11, color:S.muted, lineHeight:1.6, margin:0 }}>{t.d}</p>
          </Card>
        ))}
      </div>
      <Sec n="2" t="Modelos de ownership" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
        {[{ c:R.teal, m:'Modelo A', t:'PO lidera', sq:'Venta · Postventa', d:'El PO es dueño del resultado. El ProcOwner diseña los flujos al 100% y los entrega como insumo al PO.' },{ c:R.blue, m:'Modelo B', t:'Process lidera', sq:'Legalización', d:'Full responsabilidad en el ProcOwner. El PO conoce el estado y da seguimiento.' },{ c:R.pink, m:'Modelo C', t:'Híbrido', sq:'E-comm', d:'Roles del canal (PO web, BO ecomm) comparten responsabilidades. El PO hace seguimiento.' }].map(m => (
          <Card key={m.m} style={{ borderTop:`4px solid ${m.c.mi}` }}>
            <span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:m.c.bg, color:m.c.da }}>{m.m}</span>
            <div style={{ fontFamily:font, fontSize:13, fontWeight:800, color:S.navy, margin:'7px 0 4px' }}>{m.t}</div>
            <div style={{ fontSize:9, fontWeight:700, color:m.c.mi, marginBottom:8 }}>{m.sq}</div>
            <p style={{ fontSize:11, color:S.muted, lineHeight:1.6, margin:0 }}>{m.d}</p>
          </Card>
        ))}
      </div>
      <div style={{ marginBottom:28 }}>
        <div style={{ background:`linear-gradient(135deg,${S.navy} 0%,${R.purp.xd} 100%)`, borderRadius:14, padding:'18px 22px', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <div style={{ background:S.yellow, borderRadius:20, padding:'3px 12px' }}><span style={{ fontFamily:font, fontSize:10, fontWeight:900, color:S.navy }}>Modelo A → A v2</span></div>
            <span style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,.45)', letterSpacing:'.08em', textTransform:'uppercase' }}>Evolución al escalar a otras tribus</span>
          </div>
          <div style={{ fontFamily:font, fontSize:16, fontWeight:900, color:S.white, marginBottom:6 }}>Del Process Owner que diseña al PO que lidera con artefactos</div>
          <p style={{ fontSize:11, color:'rgba(255,255,255,.7)', lineHeight:1.7, margin:0 }}>Al abrir una nueva tribu/país, el modelo donde el Process Owner siempre diseña <strong style={{ color:S.yellow }}>no escala</strong>. El PO debe poder tomar los procesos transversales y los ya implementados en tribus anteriores, diseñar la primera versión de sus propios procesos, y escalar al Process Owner solo lo que genuinamente no puede resolver.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:10, alignItems:'start', marginBottom:16 }}>
          <Card style={{ borderTop:`4px solid ${R.gray.mi}`, opacity:0.85 }}>
            <span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:R.gray.bg, color:R.gray.da }}>Modelo A · Origen</span>
            <div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.navy, marginBottom:8, marginTop:8 }}>Process Owner diseña todo</div>
            {['PO espera al Process Owner para cada proceso nuevo','Un Process Owner por bloque de procesos y por tribu se convierte en cuello de botella','Al abrir Chile, México, etc: ¿cuántos Process Owners necesitaríamos?','El conocimiento queda concentrado, no se transfiere'].map(i => (
              <div key={i} style={{ display:'flex', gap:7, fontSize:10, color:S.muted, marginBottom:5, lineHeight:1.4 }}><span style={{ color:R.coral.mi, flexShrink:0, fontSize:12 }}>✕</span>{i}</div>
            ))}
          </Card>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:S.yellow, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:16 }}>→</span></div>
              <span style={{ fontSize:8, color:S.muted, textAlign:'center', lineHeight:1.3, maxWidth:40 }}>al escalar</span>
            </div>
          </div>
          <Card style={{ borderTop:`4px solid ${R.teal.mi}` }}>
            <span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:R.teal.bg, color:R.teal.da }}>Modelo A v2 · Escalable</span>
            <div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.navy, marginBottom:8, marginTop:8 }}>PO reutiliza artefactos, diseña y solo escala lo no resuelto</div>
            {['PO toma procesos transversales ya existentes como base','PO adapta procesos de productos y tribus anteriores a su producto','PO escala al Process Owner solo lo genuinamente complejo','El Proccess Owner habilita y se libera para la siguiente tribu', 'Para que esto suceda, los productos y procesos deben estar debidamente documentados'].map(i => (
              <div key={i} style={{ display:'flex', gap:7, fontSize:10, color:S.text, marginBottom:5, lineHeight:1.4 }}><span style={{ color:R.teal.mi, flexShrink:0, fontSize:12 }}>✓</span>{i}</div>
            ))}
          </Card>
        </div>
        <RefsBiblio />
      </div>
      <Sec n="3" t="Flujo de replicación cross-tribus para un proceso implementado por primera vez" />
      <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
        {[{ step:'01', tribe:'Tribu Regional', c:R.purp, icon:'🌐', t:'Diseño transversal', d:'El Process Owner Regional diseña el proceso en versión transversal — agnóstico de producto y país.', badge:'Process Owner Regional', arrow:true },{ step:'02', tribe:'Tribu Colombia', c:R.teal, icon:'🇨🇴', t:'Primera bajada al producto local', d:'El Process Owner Regional va a Colombia y baja el proceso al primer producto (ej. Autos). Si no es la primera vez, el PO hace la bajada del proceso y escala al Process Owner solo lo necesario.', badge:'Process Owner Regional + PO Colombia', arrow:true },{ step:'03', tribe:'Tribu Chile', c:R.blue, icon:'🇨🇱', t:'Replicación en nueva tribu', d:'El Process Owner Regional replica el proceso para el primer producto desarrollado en Chile.', badge:'Process Owner Regional + PO local Chile', arrow:true },{ step:'04', tribe:'Tribu Colombia', c:R.coral, icon:'🔄', t:'Evolutivos toman el relevo', d:'El Process Owner Evolutivos queda en Colombia manteniendo lo entregado. El regional queda replicando en otra tribu.', badge:'Process Owner Evolutivos', arrow:false }].map(s2 => (
          <div key={s2.step}>
            <Card style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'14px 16px' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:S.yellow, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontFamily:font, fontSize:11, fontWeight:900, color:S.navy }}>{s2.step}</span></div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, flexWrap:'wrap' }}><span style={{ fontSize:14 }}>{s2.icon}</span><span style={{ fontFamily:font, fontSize:13, fontWeight:800, color:S.navy }}>{s2.t}</span><span style={{ fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:20, background:s2.c.bg, color:s2.c.da }}>{s2.tribe}</span></div>
                <p style={{ fontSize:11, color:S.muted, lineHeight:1.65, marginBottom:7 }}>{s2.d}</p>
                <span style={{ fontSize:9, fontWeight:700, padding:'2px 10px', borderRadius:20, background:s2.c.bg, color:s2.c.da }}>{s2.badge}</span>
              </div>
            </Card>
            {s2.arrow && <div style={{ display:'flex', justifyContent:'center', padding:'3px 0' }}><div style={{ width:2, height:16, background:S.border }} /></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════ INTERACCIONES ════════════ */
function SecIX() {
  const [act, setAct] = useState(null);
  const [manOpen, setManOpen] = useState(null);
  return (
    <div>
      <Card style={{ marginBottom:16, borderLeft:`4px solid ${R.green.mi}`, background:R.green.bg }}>
        <div style={{ fontFamily:font, fontSize:13, fontWeight:800, color:R.green.da, marginBottom:4 }}>🎯 Línea directa: Líder P&amp;P ↔ Program Manager</div>
        <p style={{ fontSize:11, color:R.green.da, lineHeight:1.65, margin:0, opacity:0.9 }}>Gobernanza estratégica del programa regional una vez se define con el CM. El Líder de P&amp;P ordena las prioridades con el Program Manager y las bajan en cascada a sus equipos, quienes operan día a día dentro de los squads. Lo que se empiece a desviar en cuanto a posibles incumplimientos, escala de vuelta al Program y al Líder P&amp;P.</p>
      </Card>
      <Card style={{ marginBottom:18, borderLeft:`4px solid ${R.teal.mi}`, background:R.teal.bg }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:R.teal.mi, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:18 }}>🗺</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:font, fontSize:13, fontWeight:800, color:R.teal.da, marginBottom:4 }}>Product Manager — el conector del portafolio</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:10 }}>
              {[
                { icon:'📋', t:'Qué gestiona', items:['Qué está y qué no está disponible','Timelines y como conoce la capacidad del equipo, no se compromete con entregas que el equipo no puede cumplir','Conecta POs y Process Owners','Roadmap cross-producto'] },
                { icon:'🔭', t:'Qué mira', items:['Productos y procesos end-to-end','Experiencia completa del cliente','Eficiencia de procesos','Métricas del portafolio'] },
                { icon:'📊', t:'Sus métricas', items:['CSAT por producto','Conversión por producto','CAC por producto','TTM · OE% · ERI · CStP'] },
              ].map(col => (
                <div key={col.t} style={{ background:'rgba(255,255,255,.55)', borderRadius:8, padding:'10px 12px' }}>
                  <div style={{ fontSize:10, fontWeight:800, color:R.teal.da, marginBottom:6 }}>{col.icon} {col.t}</div>
                  {col.items.map(i => <div key={i} style={{ fontSize:10, color:R.teal.xd, paddingLeft:10, position:'relative', marginBottom:3, lineHeight:1.4 }}><span style={{ position:'absolute', left:0, color:R.teal.mi, fontSize:8, top:2 }}>→</span>{i}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18 }}>
        {[
          { c:R.blue, icon:'🌍', t:'Country Manager',
            d:'Dueño de la relación con el país. Aprueba toda iniciativa antes de entrar al backlog — venga del BO, PM, PO, BU o Process Owner. No libera el control al PM sin una hoja de ruta clara de implementación.',
            rel:'Aprueba el backlog del país. Tiene contacto directo con POs para validar outcomes esperados. Su pregunta permanente es: ¿cómo hacemos crecer la operación en este país?',
            metrics:['NPS general del país','Revenue país','CAC total','Participación por canal'] },
          { c:R.amber, icon:'🛒', t:'BO Canal Directo / E-comm',
            d:'Foco en la venta digital y asistida. Define cómo crece la operación en el canal directo con iniciativas concretas de negocio.',
            rel:'Define qué debe lograr el producto en el canal digital. Su pregunta permanente es: ¿por qué alguien que llegó al cotizador/contact no compró?',
            metrics:['Revenue canal directo','Conversión','CAC por negocio','Lifetime value'] },
          { c:R.amber, icon:'🤝', t:'BO Afinidades',
            d:'Foco en banca, asesores y aliados. Define cómo crece la operación con afinidades con iniciativas concretas por negocio particular.',
            rel:'Define qué necesitan los aliados para vender mejor. Su pregunta permanente es: ¿por qué un asesor prefiere vender otro seguro y no el nuestro?',
            metrics:['Revenue por negocio/aliado','Conversión por afinidad','CAC por negocio','Lifetime value'] },
          { c:R.purp, icon:'🏭', t:'BU — Business Unit',
            d:'5 clusters externos (Venta, Posventa, Membresía, Nuevos Productos, Analítica). Cada cluster puede activar iniciativas que impactan varios productos a la vez.',
            rel:'Habla principalemente con el PM. Su pregunta permanente es: ¿qué necesito para cumplir mis metas comerciales este mes?',
            metrics:['KPIs por cluster','Metas mensuales'] },
        ].map(x => (
          <Card key={x.t} style={{ borderLeft:`4px solid ${x.c.mi}` }}>
            <div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:x.c.da, marginBottom:6 }}>{x.icon} {x.t}</div>
            <p style={{ fontSize:11, color:S.muted, lineHeight:1.6, margin:0, marginBottom:8 }}>{x.d}</p>
            <div style={{ borderTop:`1px solid ${S.border}`, paddingTop:8, marginBottom:8 }}>
              <div style={{ fontSize:9, fontWeight:800, color:x.c.da, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4 }}>Su relación con producto</div>
              <p style={{ fontSize:10, color:S.muted, lineHeight:1.55, margin:0 }}>{x.rel}</p>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
              {x.metrics.map(m => <span key={m} style={{ fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:20, background:x.c.bg, color:x.c.da }}>{m}</span>)}
            </div>
          </Card>
        ))}
      </div>
      <Sec n="1" t="Espectro comercial — técnico" />
      <EspectroCard />
      <Sec n="2" t="Mapa de interacciones" />
      {[{ label:'Country Manager', color:R.blue, entries:IXS.filter(ix=>ix.from==='Country Manager') },{ label:'Product Manager', color:R.teal, entries:IXS.filter(ix=>ix.from==='Product Manager') },{ label:'Product Owners', color:R.purp, entries:IXS.filter(ix=>ix.from==='Product Owners'||ix.from==='Business Owners') },{ label:'Process Owners', color:R.coral, entries:IXS.filter(ix=>ix.from==='Process Owners') }].map(group => (
        <div key={group.label} style={{ marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <div style={{ width:10, height:10, borderRadius:'50%', background:group.color.mi, flexShrink:0 }} />
            <span style={{ fontFamily:font, fontSize:12, fontWeight:800, color:group.color.da }}>{group.label}</span>
            <div style={{ flex:1, height:1, background:group.color.li }} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {group.entries.map((ix, idx) => {
              const open = act===`${group.label}-${idx}`;
              return (
                <div key={idx} onClick={() => setAct(open?null:`${group.label}-${idx}`)} style={{ border:`1px solid ${open?ix.fc.mi:S.border}`, borderRadius:12, overflow:'hidden', cursor:'pointer', background:S.card, transition:'all .15s', borderLeft:`4px solid ${ix.fc.mi}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', background:open?ix.fc.bg:S.card }}>
                    <span style={{ fontSize:16, flexShrink:0 }}>{ix.icon}</span>
                    <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                      <Tag label={ix.from} bg={ix.fc.bg} color={ix.fc.da} />
                      {ix.to && <><span style={{ fontSize:13, color:S.border }}>⟷</span><Tag label={ix.to} bg={ix.tc.bg} color={ix.tc.da||ix.tc.mi} /></>}
                    </div>
                    <span style={{ fontSize:9, color:S.muted, background:S.xlight, padding:'2px 8px', borderRadius:20, display:open?'none':'block', maxWidth:170, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ix.when}</span>
                    <span style={{ fontSize:14, color:S.muted, transform:open?'rotate(90deg)':'none', marginLeft:3, flexShrink:0 }}>›</span>
                  </div>
                  {open && <div style={{ borderTop:`1px solid ${ix.fc.li}` }}>
                    <div style={{ padding:'10px 16px', background:`${ix.fc.bg}bb` }}><span style={{ fontSize:11, color:ix.fc.xd||ix.fc.da, lineHeight:1.7, fontWeight:500 }}>{ix.ctx}</span></div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr' }}>
                      <div style={{ padding:'12px 14px', borderRight:`1px solid ${S.border}` }}><div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.07em', color:S.muted, marginBottom:7 }}>⏰ Cuándo</div><p style={{ fontSize:11, color:S.text, lineHeight:1.65, margin:0 }}>{ix.when}</p></div>
                      <div style={{ padding:'12px 14px', borderRight:`1px solid ${S.border}` }}><div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.07em', color:ix.fc.da, marginBottom:7 }}>↑ {ix.from} entrega</div>{ix.gives.map(g=><div key={g} style={{ fontSize:11, color:S.text, paddingLeft:11, position:'relative', marginBottom:4 }}><span style={{ position:'absolute', left:0, color:ix.fc.mi, fontSize:9, top:2 }}>●</span>{g}</div>)}</div>
                      <div style={{ padding:'12px 14px' }}><div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.07em', color:ix.tc.da||ix.tc.mi||S.muted, marginBottom:7 }}>↓ {ix.to||'recibe'} entrega</div>{ix.gets.map(r=><div key={r} style={{ fontSize:11, color:S.text, paddingLeft:11, position:'relative', marginBottom:4 }}><span style={{ position:'absolute', left:0, color:ix.tc.mi||S.blue, fontSize:9, top:2 }}>●</span>{r}</div>)}</div>
                    </div>
                  </div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <Sec n="3" t="Flujo de una iniciativa: del backlog a producción" />
      <Banner bg={S.xlight}><span style={{ fontSize:16, flexShrink:0 }}>ℹ️</span><p style={{ fontSize:11, color:S.blue, lineHeight:1.65, margin:0, fontWeight:500 }}>Los pasos marcados con <strong>🔧 proceso manual</strong> tienen una variante cuando la iniciativa no es un desarrollo técnico sino un flujo operativo. Las demás aplican igual para ambos casos.</p></Banner>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        {FLOW_STEPS.map((ph, pi) => (
          <div key={pi}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <div style={{ background:ph.c.mi, borderRadius:20, padding:'4px 14px', display:'flex', alignItems:'center', gap:6 }}>{ph.loop && <span style={{ fontSize:10 }}>🔁</span>}<span style={{ fontFamily:font, fontSize:11, fontWeight:800, color:S.white }}>{ph.phase}</span></div>
              <div style={{ flex:1, height:1, background:ph.c.li }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6, paddingLeft:12, borderLeft:`2px solid ${ph.c.li}` }}>
              {ph.steps.map((st, si) => {
                const key = `${pi}-${si}`;
                const isOpen = manOpen===key;
                return (
                  <div key={si} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:10, overflow:'hidden' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px' }}>
                      <div style={{ width:22, height:22, borderRadius:'50%', background:ph.c.bg, border:`2px solid ${ph.c.mi}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontFamily:font, fontSize:9, fontWeight:900, color:ph.c.da }}>{st.n}</span></div>
                      <span style={{ fontFamily:font, fontSize:11, fontWeight:700, color:S.navy, flex:1, lineHeight:1.4 }}>{st.l}</span>
                      <div style={{ display:'flex', gap:4, flexWrap:'wrap', justifyContent:'flex-end', maxWidth:200 }}>{st.actors.map(([name,col]) => <span key={name} style={{ fontSize:8, fontWeight:700, padding:'2px 7px', borderRadius:20, background:AC[col].bg, color:AC[col].color, whiteSpace:'nowrap' }}>{name}</span>)}</div>
                      {st.manual && <button onClick={() => setManOpen(isOpen?null:key)} style={{ fontSize:9, fontWeight:700, padding:'3px 8px', borderRadius:20, background:isOpen?R.amber.mi:R.amber.bg, color:isOpen?S.white:R.amber.da, border:'none', cursor:'pointer', flexShrink:0, fontFamily:font }}>🔧 manual</button>}
                    </div>
                    {st.manual && isOpen && <div style={{ borderTop:`1px solid ${R.amber.li}`, background:R.amber.bg, padding:'8px 14px 8px 46px' }}><p style={{ fontSize:10, color:R.amber.da, lineHeight:1.6, margin:0 }}>{st.manual}</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════ BU & SQUADS ════════════ */
function SecBU() {
  const [ac, setAc] = useState('venta');
  const cl = CLUSTERS.find(c => c.id===ac);
  return (
    <div>
      <Banner><span style={{ fontSize:16, flexShrink:0 }}>🏭</span><p style={{ fontSize:12, color:S.blue, lineHeight:1.7, margin:0, fontWeight:500 }}>La BU tiene <strong>5 clusters</strong>, cada uno con su líder. Un cluster puede activar múltiples squads en paralelo e impactar varios productos a la vez.</p></Banner>
      <Card style={{ marginBottom:18, borderLeft:`4px solid ${S.yellow}`, background:S.yelBg }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:S.yellow, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:18 }}>🗺</div>
          <div>
            <div style={{ fontFamily:font, fontSize:13, fontWeight:800, color:S.navy, marginBottom:4 }}>El Product Manager es el socio de priorización de la BU</div>
            <p style={{ fontSize:11, color:S.muted, lineHeight:1.65, margin:0, marginBottom:8 }}>Una iniciativa de cluster puede impactar varios productos a la vez — no hay un PO que cubra todo el alcance. El PM recibe, evalúa con el CM cómo está el backlog de los squads involucrar, y devuelve una sola respuesta consolidada.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
              {[{ icon:'📥', t:'Recibe de la BU', d:'Iniciativas y prioridades del cluster. Una sola conversación, sin importar cuántos productos impacte.' },{ icon:'⚖️', t:'Evalúa y distribuye', d:'Qué negociaciones se tienen que hacer con los POs dueños de sus backlogs, qué squads se activan y cómo se prioriza frente al roadmap.' },{ icon:'📤', t:'Devuelve a la BU', d:'Estado consolidado y de cada inicativa, timelines y decisiones. Es canal de respuesta con el CM.' }].map(s => (
                <div key={s.t} style={{ background:S.card, borderRadius:8, padding:'10px 12px', border:`1px solid ${S.border}` }}>
                  <div style={{ fontSize:14, marginBottom:4 }}>{s.icon}</div>
                  <div style={{ fontFamily:font, fontSize:10, fontWeight:800, color:S.navy, marginBottom:3 }}>{s.t}</div>
                  <p style={{ fontSize:10, color:S.muted, lineHeight:1.5, margin:0 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Sec n="1" t="Clusters de la BU" />
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
        {CLUSTERS.map(c => <button key={c.id} onClick={() => setAc(c.id)} style={{ border:ac===c.id?'none':`1px solid ${S.border}`, borderRadius:20, padding:'7px 16px', cursor:'pointer', fontFamily:font, fontSize:11, fontWeight:700, background:ac===c.id?S.blue:S.card, color:ac===c.id?S.white:S.muted, transition:'all .15s' }}>{c.label}</button>)}
      </div>
      <div style={{ marginBottom:18 }}>
        <div style={{ background:cl.c.mi, borderRadius:'12px 12px 0 0', padding:'14px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                <span style={{ fontFamily:font, fontSize:16, fontWeight:900, color:S.white }}>{cl.label}</span>
                <span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:'rgba(255,255,255,.15)', color:S.white }}>Líder BU: {cl.leader}</span>
                <span style={{ fontSize:9, fontWeight:700, padding:'2px 9px', borderRadius:20, background:S.yellow+'33', color:S.yellow, border:`1px solid ${S.yellow}55` }}>Socio insurtech: Product Manager</span>
              </div>
              <p style={{ fontSize:11, color:'rgba(255,255,255,.8)', margin:0 }}>{cl.desc}</p>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontFamily:font, fontSize:28, fontWeight:900, color:S.white }}>{cl.squads.length}</div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,.6)' }}>accionables</div>
            </div>
          </div>
          {cl.kpi && (
            <div style={{ background:'rgba(0,0,0,.15)', borderRadius:8, padding:'8px 12px', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.06em' }}>KPI principal</span><span style={{ fontSize:10, fontWeight:700, color:S.yellow }}>{cl.kpi.main}</span></div>
              {cl.kpi.int.length>0 && <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}><span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.06em' }}>Intermedios</span>{cl.kpi.int.map(k => <span key={k} style={{ fontSize:9, padding:'1px 7px', borderRadius:20, background:'rgba(255,255,255,.12)', color:'rgba(255,255,255,.8)', fontWeight:600 }}>{k}</span>)}</div>}
            </div>
          )}
        </div>
        {cl.squads.length===0 ? (
          <div style={{ border:`1px solid ${S.border}`, borderTop:'none', borderRadius:'0 0 12px 12px', padding:'24px 16px', background:S.card, textAlign:'center' }}><p style={{ fontSize:12, color:S.muted, margin:0 }}>Sin accionables definidos aún</p></div>
        ) : (
          <div style={{ border:`1px solid ${S.border}`, borderTop:'none', borderRadius:'0 0 12px 12px', padding:12, background:S.card, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:8 }}>
            {cl.squads.map(sq => (
              <div key={sq.n} style={{ background:S.xlight, borderTop:`3px solid ${cl.c.mi}`, borderRadius:8, padding:'11px 12px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                  <div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:S.navy, lineHeight:1.3, flex:1, paddingRight:6 }}>{sq.n}</div>
                  {sq.q && <span style={{ fontSize:8, fontWeight:800, padding:'2px 7px', borderRadius:20, background:cl.c.bg, color:cl.c.da, flexShrink:0 }}>{sq.q}</span>}
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:R.purp.mi, flexShrink:0 }} />
                    <div><div style={{ fontSize:8, fontWeight:800, color:R.purp.da, textTransform:'uppercase', letterSpacing:'.05em' }}>Líder de producto</div><div style={{ fontSize:10, fontWeight:700, color:sq.po==='Por asignar'?S.muted:S.navy, fontStyle:sq.po==='Por asignar'?'italic':'normal' }}>{sq.po}</div></div>
                  </div>
                  {sq.pm!=='—' && <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:6, height:6, borderRadius:'50%', background:R.teal.mi, flexShrink:0 }} /><div><div style={{ fontSize:8, fontWeight:800, color:R.teal.da, textTransform:'uppercase', letterSpacing:'.05em' }}>Socio de ejecución</div><div style={{ fontSize:10, fontWeight:700, color:S.navy }}>{sq.pm}</div></div></div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Sec n="2" t="Vista resumen" />
      <Card style={{ padding:0, overflow:'hidden' }}>
        {CLUSTERS.map((c,i) => (
          <div key={c.id} style={{ display:'flex', alignItems:'stretch', borderBottom:i<CLUSTERS.length-1?`1px solid ${S.border}`:'none' }}>
            <div style={{ width:130, flexShrink:0, background:c.c.bg, padding:'10px 14px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:`1px solid ${S.border}` }}>
              <div style={{ fontFamily:font, fontSize:12, fontWeight:800, color:c.c.da }}>{c.label}</div>
              <div style={{ fontSize:10, color:c.c.da, opacity:0.7 }}>{c.leader}</div>
            </div>
            <div style={{ flex:1, padding:'8px 12px', display:'flex', flexWrap:'wrap', gap:5, alignItems:'center' }}>
              {c.squads.map(sq => <span key={sq.n} style={{ fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, background:S.xlight, color:S.blue, border:`1px solid ${S.border}` }}>{sq.n}</span>)}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ════════════ GANTT ════════════ */
function SecGantt({ personas, setPersonas, groups, setGroups }) {
  const [view, setView] = useState('gantt');
  const [filter, setFilter] = useState('all');
  const [col, setCol] = useState(48);
  const [editN, setEditN] = useState(null);
  const [editV, setEditV] = useState('');
  const [addP, setAddP] = useState(false);
  const [newP, setNewP] = useState({ name:'', color:'#156082' });
  const [addR, setAddR] = useState(null);
  const [newRL, setNewRL] = useState('');
  const [newRP, setNewRP] = useState('p1');
  const pOf = id => personas.find(p=>p.id===id)||personas[3];
  const cycleCell = (gid,iid,mi) => { setGroups(gs=>gs.map(g=>{ if(g.id!==gid) return g; return {...g, items:g.items.map(it=>{ if(it.id!==iid) return it; const ex=it.bars.find(b=>b.m===mi); if(!ex) return {...it,bars:[...it.bars,{m:mi,p:'Diseño'}]}; const idx=GPHASES.indexOf(ex.p); if(idx===GPHASES.length-1||idx===-1) return {...it,bars:it.bars.filter(b=>b.m!==mi)}; return {...it,bars:it.bars.map(b=>b.m===mi?{...b,p:GPHASES[idx+1]}:b)}; })}; })); };
  const delRow = (gid,iid) => setGroups(gs=>gs.map(g=>g.id!==gid?g:{...g,items:g.items.filter(i=>i.id!==iid)}));
  const cyclePerson = (gid,iid) => { setGroups(gs=>gs.map(g=>{ if(g.id!==gid) return g; return {...g, items:g.items.map(it=>{ if(it.id!==iid) return it; const idx=personas.findIndex(p=>p.id===it.person); const next=personas[(idx+1)%personas.length]; return {...it,person:next.id}; })}; })); };
  const addGroup = () => setGroups(gs=>[...gs,{id:uid(),label:'Nuevo producto',tribe:'🌐',items:[]}]);
  const addRow = gid => { if(!newRL.trim()) return; setGroups(gs=>gs.map(g=>g.id!==gid?g:{...g,items:[...g.items,{id:uid(),sub:'',label:newRL,person:newRP,bars:[]}]})); setNewRL(''); setAddR(null); };
  const addPersona = () => { if(!newP.name.trim()) return; const r=parseInt(newP.color.slice(1,3),16),g=parseInt(newP.color.slice(3,5),16),b=parseInt(newP.color.slice(5,7),16); setPersonas(ps=>[...ps,{id:uid(),name:newP.name,color:newP.color,li:`rgba(${r},${g},${b},.18)`,da:`rgba(${r},${g},${b},1)`}]); setNewP({name:'',color:'#156082'}); setAddP(false); };
  const commitN = (type,id) => { if(type==='p') setPersonas(ps=>ps.map(p=>p.id===id?{...p,name:editV}:p)); else setGroups(gs=>gs.map(g=>({...g,items:g.items.map(i=>i.id===id?{...i,label:editV}:i)}))); setEditN(null); };
  const loadOf = pid => { const c=Array(12).fill(0); groups.forEach(g=>g.items.forEach(it=>{ if(it.person===pid) it.bars.forEach(b=>{ if(b.m<12) c[b.m]++; }); })); return c; };

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:7, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${S.border}` }}>
        {personas.map(p => (
          <div key={p.id} onClick={() => setFilter(f=>f===p.id?'all':p.id)} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:20, cursor:'pointer', border:filter===p.id?`2px solid ${p.color}`:`1px solid ${S.border}`, background:filter===p.id?p.li:S.card, transition:'all .12s' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:p.color, flexShrink:0 }} />
            {editN===p.id ? <input value={editV} onChange={e=>setEditV(e.target.value)} onBlur={()=>commitN('p',p.id)} onKeyDown={e=>e.key==='Enter'&&commitN('p',p.id)} autoFocus style={{ fontSize:11, fontWeight:700, border:'none', background:'transparent', outline:'none', width:90, color:p.da }} />
              : <span style={{ fontSize:11, fontWeight:700, color:p.da, fontFamily:font }} onDoubleClick={e=>{ e.stopPropagation(); setEditN(p.id); setEditV(p.name); }}>{p.name}</span>}
          </div>
        ))}
        {addP ? (
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:20, border:`1px solid ${S.border}`, background:S.card }}>
            <input type="color" value={newP.color} onChange={e=>setNewP(n=>({...n,color:e.target.value}))} style={{ width:22, height:22, border:'none', borderRadius:'50%', cursor:'pointer', padding:0 }} />
            <input value={newP.name} onChange={e=>setNewP(n=>({...n,name:e.target.value}))} placeholder="Nombre..." onKeyDown={e=>e.key==='Enter'&&addPersona()} style={{ fontSize:11, border:'none', background:'transparent', outline:'none', width:80, color:S.text, fontFamily:font }} />
            <button onClick={addPersona} style={{ fontSize:10, border:'none', background:S.blue, color:S.white, borderRadius:20, padding:'2px 10px', cursor:'pointer', fontFamily:font, fontWeight:700 }}>✓</button>
            <button onClick={()=>setAddP(false)} style={{ fontSize:11, border:'none', background:'transparent', color:S.muted, cursor:'pointer' }}>✕</button>
          </div>
        ) : (
          <button onClick={()=>setAddP(true)} style={{ fontSize:11, fontWeight:700, border:`1px dashed ${S.border}`, borderRadius:20, padding:'5px 12px', cursor:'pointer', background:'transparent', color:S.muted, fontFamily:font }}>+ persona</button>
        )}
        <div style={{ flex:1 }} />
        <div style={{ display:'flex', gap:4, background:S.xlight, padding:3, borderRadius:20, border:`1px solid ${S.border}` }}>
          {[['gantt','▬ Gantt'],['load','◼ Carga']].map(([v,l]) => <button key={v} onClick={()=>setView(v)} style={{ border:'none', borderRadius:20, padding:'5px 12px', cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:font, background:view===v?S.blue:'transparent', color:view===v?S.white:S.muted, transition:'all .12s' }}>{l}</button>)}
        </div>
        {view==='gantt' && <div style={{ display:'flex', gap:4 }}>
          <button onClick={()=>setCol(c=>Math.max(30,c-7))} style={{ border:`1px solid ${S.border}`, borderRadius:20, padding:'4px 10px', cursor:'pointer', fontSize:12, background:S.card, color:S.muted, fontFamily:font }}>−</button>
          <button onClick={()=>setCol(c=>Math.min(90,c+7))} style={{ border:`1px solid ${S.border}`, borderRadius:20, padding:'4px 10px', cursor:'pointer', fontSize:12, background:S.card, color:S.muted, fontFamily:font }}>+</button>
        </div>}
      </div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${S.border}` }}>
        <span style={{ fontSize:9, color:S.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em' }}>Clic = fase:</span>
        {GPHASES.map(ph => <div key={ph} style={{ display:'flex', alignItems:'center', gap:4 }}><div style={{ width:11, height:9, borderRadius:3, background:h2r(S.blue,FOPACITY[ph]) }} /><span style={{ fontSize:9, color:S.muted, fontFamily:font }}>{ph}</span></div>)}
        <span style={{ fontSize:9, color:S.border, fontStyle:'italic' }}>→ clic extra = borrar</span>
      </div>
      {view==='gantt' && (
        <div style={{ overflowX:'auto', border:`1px solid ${S.border}`, borderRadius:12 }}>
          <div style={{ minWidth:155+col*12 }}>
            <div style={{ display:'grid', gridTemplateColumns:`155px repeat(12,${col}px)`, background:S.navy, borderBottom:`2px solid ${S.blue}`, position:'sticky', top:0, zIndex:2 }}>
              <div style={{ padding:'8px 12px', fontSize:9, fontWeight:800, color:'rgba(255,255,255,.5)', fontFamily:font, textTransform:'uppercase', letterSpacing:'.06em' }}>Iniciativa</div>
              {MONTHS.map((m,i) => <div key={m} style={{ padding:'8px 3px', textAlign:'center', fontSize:8, fontWeight:800, color:i>=10?'rgba(255,255,255,.25)':'rgba(255,255,255,.6)', letterSpacing:'.04em', textTransform:'uppercase', borderLeft:`1px solid rgba(255,255,255,.06)`, background:i>=10?'rgba(0,0,0,.1)':'transparent', fontFamily:font }}>{m}{i>=10&&<div style={{ fontSize:7, color:'rgba(255,255,255,.2)' }}>▸</div>}</div>)}
            </div>
            {groups.filter(g=>filter==='all'||g.items.some(i=>i.person===filter)).map(g => (
              <div key={g.id}>
                <div style={{ display:'grid', gridTemplateColumns:`155px repeat(12,${col}px)`, background:S.xlight, borderBottom:`1px solid ${S.border}` }}>
                  <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:7 }}><span style={{ fontSize:9, color:S.muted }}>{g.tribe}</span><span style={{ fontSize:12, fontFamily:font, fontWeight:800, color:S.navy }}>{g.label}</span></div>
                  {MONTHS.map((_,i) => <div key={i} style={{ borderLeft:`1px solid ${S.border}`, background:i>=10?'#E3EFF8':'transparent' }} />)}
                </div>
                {g.items.filter(it=>filter==='all'||it.person===filter).map(it => {
                  const pr = pOf(it.person);
                  const bMap = Object.fromEntries(it.bars.map(b=>[b.m,b.p]));
                  return (
                    <div key={it.id} style={{ display:'grid', gridTemplateColumns:`155px repeat(12,${col}px)`, borderBottom:`1px solid ${S.border}`, minHeight:28, background:S.card }}>
                      <div style={{ padding:'4px 8px 4px 12px', display:'flex', alignItems:'center', gap:5, overflow:'hidden' }}>
                        <div onClick={()=>cyclePerson(g.id,it.id)} title={`Dueño: ${pr.name} · clic para cambiar`} style={{ width:6, height:6, borderRadius:'50%', background:pr.color, flexShrink:0, cursor:'pointer' }} />
                        {editN===it.id ? <input value={editV} onChange={e=>setEditV(e.target.value)} onBlur={()=>commitN('row',it.id)} onKeyDown={e=>e.key==='Enter'&&commitN('row',it.id)} autoFocus style={{ fontSize:10, border:'none', background:'transparent', outline:'none', flex:1, fontFamily:font }} />
                          : <span style={{ fontSize:10, color:S.text, flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', cursor:'default', fontFamily:font, fontWeight:600 }} onDoubleClick={()=>{ setEditN(it.id); setEditV(it.label); }}>{it.label}</span>}
                        <button onClick={()=>delRow(g.id,it.id)} style={{ fontSize:11, border:'none', background:'transparent', color:S.border, cursor:'pointer', padding:'0 2px', flexShrink:0 }}>×</button>
                      </div>
                      {MONTHS.map((_,mi) => { const ph=bMap[mi]; const active=ph!==undefined; const bg=active?h2r(pr.color,FOPACITY[ph]||0):mi>=10?'#F0F7FC':'transparent'; return <div key={mi} onClick={()=>cycleCell(g.id,it.id,mi)} style={{ borderLeft:`1px solid ${S.border}`, background:bg, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:'1px' }}>{active&&ph&&<span style={{ fontSize:6, fontWeight:800, color:(FOPACITY[ph]||0)>0.6?'#fff':pr.da, textAlign:'center', lineHeight:1.2, overflow:'hidden', maxWidth:'100%', fontFamily:font }}>{ph}</span>}</div>; })}
                    </div>
                  );
                })}
                {addR===g.id ? (
                  <div style={{ display:'flex', alignItems:'center', gap:7, padding:'6px 12px', borderBottom:`1px solid ${S.border}`, background:S.xlight }}>
                    <input value={newRL} onChange={e=>setNewRL(e.target.value)} placeholder="Nombre de la iniciativa..." onKeyDown={e=>e.key==='Enter'&&addRow(g.id)} autoFocus style={{ fontSize:11, border:`1px solid ${S.border}`, borderRadius:20, padding:'4px 10px', flex:1, outline:'none', fontFamily:font }} />
                    <select value={newRP} onChange={e=>setNewRP(e.target.value)} style={{ fontSize:11, border:`1px solid ${S.border}`, borderRadius:20, padding:'4px 8px', color:S.text, fontFamily:font }}>{personas.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
                    <button onClick={()=>addRow(g.id)} style={{ fontSize:11, border:'none', background:S.blue, color:S.white, borderRadius:20, padding:'4px 12px', cursor:'pointer', fontFamily:font, fontWeight:700 }}>+ Añadir</button>
                    <button onClick={()=>setAddR(null)} style={{ fontSize:11, border:'none', background:'transparent', color:S.muted, cursor:'pointer' }}>✕</button>
                  </div>
                ) : (
                  <div onClick={()=>setAddR(g.id)} style={{ padding:'5px 12px', fontSize:11, color:S.muted, cursor:'pointer', display:'flex', gap:5, background:S.card, fontFamily:font, fontWeight:600 }}><span>+</span>añadir iniciativa</div>
                )}
              </div>
            ))}
            <div onClick={addGroup} style={{ padding:'8px 12px', fontSize:11, color:S.muted, cursor:'pointer', display:'flex', gap:5, background:S.xlight, borderTop:`1px solid ${S.border}`, fontFamily:font, fontWeight:600 }}><span>+</span>añadir producto / grupo</div>
          </div>
        </div>
      )}
      {view==='load' && (
        <div>
          <Banner><span>⚠️</span><span style={{ fontSize:11, color:S.blue, lineHeight:1.6, fontWeight:500 }}>Iniciativas simultáneas por persona y mes. Más de 2 en el mismo mes es señal de sobrecarga.</span></Banner>
          {personas.filter(p=>p.id!=='p4').map(p => {
            const loads = loadOf(p.id);
            const items = groups.flatMap(g=>g.items.filter(i=>i.person===p.id));
            return (
              <Card key={p.id} style={{ marginBottom:12, padding:0, overflow:'hidden' }}>
                <div style={{ padding:'10px 16px', display:'flex', alignItems:'center', gap:8, background:S.xlight, borderBottom:`1px solid ${S.border}` }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:p.color }} />
                  <span style={{ fontFamily:font, fontSize:13, fontWeight:800, color:S.navy }}>{p.name}</span>
                  <span style={{ fontSize:10, color:S.muted }}>{items.length} iniciativa{items.length!==1?'s':''}</span>
                </div>
                <div style={{ padding:'12px 16px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'60px repeat(12,1fr)', gap:0, marginBottom:10 }}>
                    <div style={{ fontSize:8, color:S.muted, textTransform:'uppercase', letterSpacing:'.06em', display:'flex', alignItems:'center', fontFamily:font, fontWeight:700 }}>Carga</div>
                    {MONTHS.map((m,i) => <div key={m} style={{ textAlign:'center' }}><div style={{ margin:'0 1px', height:26, borderRadius:6, background:loads[i]===0?S.xlight:h2r(p.color,loads[i]===1?0.35:loads[i]===2?0.65:0.95), display:'flex', alignItems:'center', justifyContent:'center' }}>{loads[i]>0&&<span style={{ fontSize:11, fontWeight:800, color:loads[i]>=2?'#fff':p.da, fontFamily:font }}>{loads[i]}</span>}</div><div style={{ fontSize:7, color:i>=10?S.border:S.muted, marginTop:3, fontFamily:font }}>{m}</div></div>)}
                  </div>
                  {items.map(it => { const g=groups.find(g=>g.items.some(i=>i.id===it.id)); const s=it.bars.length?Math.min(...it.bars.map(b=>b.m)):null; const e=it.bars.length?Math.max(...it.bars.map(b=>b.m)):null; return <div key={it.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 8px', background:S.xlight, borderRadius:6, marginBottom:4 }}><span style={{ fontSize:9, fontWeight:700, color:p.da, padding:'2px 8px', borderRadius:20, background:p.li, flexShrink:0 }}>{g && g.label}</span><span style={{ fontSize:11, color:S.text, flex:1, fontFamily:font, fontWeight:600 }}>{it.label}</span>{s!==null&&<span style={{ fontSize:9, color:S.muted, flexShrink:0 }}>{MONTHS[s]}→{MONTHS[e]}</span>}</div>; })}
                </div>
              </Card>
            );
          })}
          <div style={{ marginTop:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:S.navy, flexShrink:0 }} />
              <span style={{ fontFamily:font, fontSize:12, fontWeight:800, color:S.navy }}>Sistema de backup del equipo</span>
              <div style={{ flex:1, height:1, background:S.border }} />
            </div>
            <Card style={{ marginBottom:10, borderLeft:`4px solid ${R.green.mi}`, background:R.green.bg }}>
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>🎯</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:R.green.da, marginBottom:6 }}>Backup de la Líder P&amp;P</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {[{ n:'1', bg:R.teal.mi, t:'Product Manager — operativo', d:'Cubre el día a día: BU, BOs, priorización del portafolio, seguimiento del equipo. Puede sostener la operación sin escalar afuera.' },{ n:'2', bg:R.amber.mi, t:'Bibi · Líder de Growth — par estratégico', d:'Par en el mismo nivel. Conoce el contexto comercial y de producto. Representa a P&P en conversaciones con TI, Expansión y COE cuando el PM no tiene el nivel suficiente.' },{ n:'3', bg:R.coral.mi, t:'Guille · Head de Producto & Growth — escalación máxima', d:'Para decisiones estratégicas que requieren autoridad: CEO, negociaciones de expansión, cambios estructurales del equipo o del portafolio.' }].map(item => (
                      <div key={item.n} style={{ display:'flex', gap:8, alignItems:'flex-start', background:'rgba(255,255,255,.6)', borderRadius:8, padding:'8px 10px' }}>
                        <div style={{ width:20, height:20, borderRadius:'50%', background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontSize:9, fontWeight:900, color:S.white }}>{item.n}</span></div>
                        <div><div style={{ fontSize:10, fontWeight:800, color:S.navy, marginBottom:2 }}>{item.t}</div><div style={{ fontSize:9, color:S.muted, lineHeight:1.5 }}>{item.d}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <Card style={{ marginBottom:10, borderLeft:`4px solid ${S.yellow}`, background:S.yelBg }}>
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>🗺</span>
                <div><div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:S.navy, marginBottom:3 }}>El PM es el primer backup de todos los POs</div><p style={{ fontSize:10, color:S.muted, lineHeight:1.6, margin:0 }}>No gestiona el producto en el día a día, pero tiene el mapa completo del portafolio. Puede sostener decisiones críticas y mantener las iniciativas en movimiento mientras el titular vuelve.</p></div>
              </div>
            </Card>
            <Card style={{ marginBottom:10, borderLeft:`4px solid ${R.purp.mi}` }}>
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>⬡</span>
                <div>
                  <div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:S.navy, marginBottom:3 }}>Backup entre POs: dinámico, no fijo</div>
                  <p style={{ fontSize:10, color:S.muted, lineHeight:1.6, margin:0, marginBottom:6 }}>Los POs no tienen par predefinido. Cuando alguien sale, se revisa el Gantt en ese momento y quien tenga 0–1 iniciativas activas ese mes absorbe el seguimiento. Asignarlo de forma fija crea riesgo de doble sobrecarga.</p>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {[{ nivel:'🟢 Puede decidir', d:'Priorización del sprint, criterios conocidos' },{ nivel:'🟡 Consulta al PM', d:'Cambios de alcance, UAT comercial' },{ nivel:'🔴 Espera al titular', d:'Decisiones estratégicas, negociación con la BU' }].map(n => (
                      <div key={n.nivel} style={{ background:S.xlight, borderRadius:8, padding:'6px 10px', flex:1, minWidth:160 }}>
                        <div style={{ fontSize:10, fontWeight:800, color:S.navy, marginBottom:2 }}>{n.nivel}</div>
                        <div style={{ fontSize:9, color:S.muted }}>{n.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <Card style={{ borderLeft:`4px solid ${R.coral.mi}` }}>
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>⚙</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:font, fontSize:11, fontWeight:800, color:S.navy, marginBottom:8 }}>Backup entre Process Owners: pares por bloques contiguos</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {[{ a:'ProcOwner Onboarding Mauro', ca:'#1D9E75', b:'ProcOwner Engagement Cin', cb:'#156082', d:'Bloques de activación y vida del cliente — lógica más cercana entre sí.' },{ a:'ProcOwner Engagement Cin', ca:'#156082', b:'ProcOwner Loyalty Caro B', cb:'#A02B93', d:'Bloques contiguos del journey de posventa.' }].map((par,i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:8, background:S.xlight, borderRadius:8, padding:'8px 10px', flexWrap:'wrap' }}>
                        <span style={{ fontSize:10, fontWeight:700, color:par.ca }}>{par.a}</span>
                        <span style={{ fontSize:12, color:S.border }}>⟷</span>
                        <span style={{ fontSize:10, fontWeight:700, color:par.cb }}>{par.b}</span>
                        <span style={{ fontSize:9, color:S.muted, flex:1, minWidth:160 }}>{par.d}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex', gap:10, alignItems:'flex-start', background:R.coral.bg, borderRadius:8, padding:'8px 10px' }}>
                      <span style={{ fontSize:10, fontWeight:700, color:R.coral.da, flexShrink:0 }}>ProcOwner Evolutivos Pipe</span>
                      <span style={{ fontSize:9, color:R.coral.da, lineHeight:1.5 }}>No tiene par directo — es transversal a los tres bloques. Si falta, el PM coordina con cada bloque que necesite evolutivos ese mes. No hay un solo backup que pueda cubrirlo completo.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      <Banner><span style={{ fontSize:13 }}>💡</span><span style={{ fontSize:11, color:S.blue, fontWeight:500 }}><strong>Clic en celda</strong> = añadir/avanzar fase · <strong>Clic en punto de color</strong> = cambiar dueño · <strong>Doble clic en nombre</strong> = editar · <strong>×</strong> = borrar fila · <strong>+ persona</strong> = nuevo color/rol</span></Banner>
    </div>
  );
}

/* ════════════ APP ════════════ */
export default function App() {
  const [tab, setTab] = useState('equipo');
  const [personas, setPersonas] = useState(INIT_P);
  const [groups, setGroups] = useState(INIT_G);
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <PageBg>
        <div style={{ maxWidth:760, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ padding:'28px 0 22px', marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:S.yellow, border:`2px solid ${S.navy}` }} />
              <span style={{ fontFamily:font, fontSize:10, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', color:S.muted }}>Insurtech · Equipo Estratégico</span>
            </div>
            <h1 style={{ fontFamily:font, fontSize:32, fontWeight:900, lineHeight:1.05, letterSpacing:'-.02em', marginBottom:8, color:S.navy }}>Producto &amp; <span style={{ color:S.blue }}>Procesos</span></h1>
            <p style={{ fontSize:13, fontWeight:600, color:S.muted, lineHeight:1.75, maxWidth:500, marginBottom:18 }}>Estructura, tribus, metodología de diseño, interacciones, BU clusters y roadmap.</p>
            <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
              {NAV.map(n => { const a=tab===n.id; return (
                <button key={n.id} onClick={()=>setTab(n.id)} style={{ border:a?'none':`1px solid ${S.border}`, borderRadius:20, padding:'7px 16px', cursor:'pointer', fontFamily:font, fontSize:11, fontWeight:800, letterSpacing:'.01em', transition:'all .15s', background:a?S.navy:S.card, color:a?S.white:S.muted, boxShadow:a?'0 2px 8px rgba(14,40,65,.2)':'none', whiteSpace:'nowrap' }}>
                  <span style={{ marginRight:5, fontSize:10 }}>{n.icon}</span>{n.label}
                </button>
              ); })}
            </div>
          </div>
          <div>
            {tab==='equipo' && <SecEquipo />}
            {tab==='metodo' && <SecMetodo />}
            {tab==='fund'   && <SecFund />}
            {tab==='tribus' && <SecTribus />}
            {tab==='ix'     && <SecIX />}
            {tab==='bu'     && <SecBU />}
            {tab==='gantt'  && <SecGantt personas={personas} setPersonas={setPersonas} groups={groups} setGroups={setGroups} />}
          </div>
        </div>
      </PageBg>
    </>
  );
}
