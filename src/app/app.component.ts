import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';

type Section = 'inicio' | 'acerca' | 'beneficios' | 'politicas' | 'establecimientos' | 'cuenta' | 'contacto';
type AccountPage = 'inicio' | 'movimientos' | 'password' | 'datos' | 'establecimientos' | 'premios';

interface AccountMovement {
  code: string;
  location: string;
  description: string;
  date: string;
  charge: string;
  credit: string;
  balance: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="site-shell">
      <div class="topline">
        <span>.:: Fringe Hair and Beauty ::. | 0.0.9 |</span>
        <button class="login-link" type="button" (click)="navigate('cuenta')">Iniciar sesión</button>
      </div>
      <header class="brand-row">
        <a class="brand" (click)="navigate('inicio')" aria-label="Fringe Hair and Beauty, inicio">
          <img src="assets/img/logo/logo_fringe.jpg" alt="Fringe Hair and Beauty">
        </a>
      </header>
      <nav class="main-nav" aria-label="Navegación principal">
        <div class="nav-links">
          @for (item of navItems; track item.id) {
            <button type="button" [class.active]="section === item.id" [attr.aria-label]="item.label" [title]="item.label" (click)="navigate(item.id)">
              <span class="nav-icon" aria-hidden="true">
                @switch (item.id) {
                  @case ('inicio') {
                    <svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>
                  }
                  @case ('acerca') {
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" /></svg>
                  }
                  @case ('beneficios') {
                    <svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" /></svg>
                  }
                  @case ('politicas') {
                    <svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5m-9 4h5m-5 4h5" /></svg>
                  }
                  @case ('establecimientos') {
                    <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  }
                  @case ('cuenta') {
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                  }
                  @case ('contacto') {
                    <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  }
                }
              </span>
              <span class="nav-label">{{ item.label }}</span>
            </button>
          }
        </div>
      </nav>

      @if (section === 'inicio') {
        <section class="hero" aria-label="Fringe Hair and Beauty">
          <div class="carousel-frame" [class.controls-visible]="controlsVisible"
               (pointermove)="showControls()" (pointerdown)="showControls()" (pointerleave)="hideControls()"
               (focusin)="showControls()" (focusout)="hideControls()">
            <img [src]="slides[slide]" alt="Fringe Hair and Beauty">
            <button class="slide-control previous" type="button" aria-label="Imagen anterior" (click)="moveSlide(-1)">‹</button>
            <button class="slide-control next" type="button" aria-label="Imagen siguiente" (click)="moveSlide(1)">›</button>
            <div class="slide-dots">
              @for (image of slides; track image; let i = $index) {
                <button type="button" [class.selected]="slide === i" [attr.aria-label]="'Ver imagen ' + (i + 1)" (click)="selectSlide(i)"></button>
              }
            </div>
          </div>
        </section>
      } @else {
        <section class="content-panel"
                 [class.account-view]="section === 'cuenta'"
                 [class.about-view]="section === 'acerca'"
                 [class.benefits-view]="section === 'beneficios'"
                 [class.policies-view]="section === 'politicas'"
                 [class.locations-view]="section === 'establecimientos'"
                 [class.contact-view]="section === 'contacto'">
          @switch (section) {
            @case ('acerca') {
              <div class="panel-heading"><h1>ACERCA DE</h1></div>
              <article class="about-content">
                <h2>“Fringe Experience”</h2>
                <p>¡Bienvenida a Fringe Rewards! Un programa hecho para ti, que siempre confías en nosotras para verte y sentirte espectacular. Acumula puntos cada vez que nos visitas y transforma tu experiencia Fringe en recompensas en quetzales, descuentos y más momentos Fringe.</p>
                <div class="feature-grid">
                  <img class="feature-image" src="assets/img/menu_tabs/Loyalty-Card.png" alt="Tarjeta Fringe Rewards">
                  <div class="benefit-card">
                    <h2>Beneficios</h2>
                    <ol>
                      <li>Gana puntos en cada compra</li>
                      <li>Obtén descuentos y servicios exclusivos</li>
                      <li>Accede a eventos y promociones solo para miembros</li>
                      <li>Canjea tus puntos por tus servicios o productos favoritos</li>
                    </ol>
                  </div>
                </div>
                <h2>Historia del plan</h2>
                <p>En Fringe Hair &amp; Beauty sabemos que cada visita es especial, y queremos que esa fidelidad sea recompensada. Fringe Rewards nació como una forma de agradecer tu preferencia con beneficios que te enamorarán aún más de la experiencia Fringe.</p>
                <div class="feature-grid mission-grid">
                  <div><img src="assets/img/menu_tabs/Mision.png" alt="Misión Fringe"><div class="pink-card"><h2>Misión</h2><p>Crear un espacio donde la belleza y el cuidado se celebren contigo.</p></div></div>
                  <div><img src="assets/img/menu_tabs/Vision.png" alt="Visión Fringe"><div class="pink-card"><h2>Visión</h2><p>Nuestra meta es consentirte y fortalecer ese lazo especial que compartimos cada vez que nos visitas.</p></div></div>
                </div>
                <h2>Nuestros valores</h2>
                <ul class="values-list">
                  <li><strong>Confianza:</strong> Siempre trabajamos con calidad y transparencia.</li>
                  <li><strong>Cercanía:</strong> Tu experiencia es única, y queremos que lo sientas.</li>
                  <li><strong>Gratitud:</strong> Porque cada visita cuenta y queremos devolverte el cariño.</li>
                </ul>
              </article>
            }
            @case ('beneficios') {
              <div class="panel-heading"><h1>BENEFICIOS</h1></div>
              <img class="wide-promo" src="assets/img/menu_tabs/Loyalty-Card.png" alt="Fringe Rewards">
              <article class="centered-content">
                <h2>BENEFICIOS Y RECOMPENSAS</h2>
                <h3>“Ven, acumula y disfruta”</h3>
                <ol>
                  <li>Gana puntos con estilo: Por cada Q150 de consumo recibes Q5.</li>
                  <li>Descuentos y servicios gratis: Canjea tus puntos por lo que más disfrutas, como tratamientos, productos o un nuevo look.</li>
                  <li>Promociones exclusivas: Sorpréndete con ofertas y eventos especiales pensados solo para miembros Fringe Rewards.</li>
                </ol>
                <p class="center-text">* Aplican restricciones.</p>
              </article>
            }
            @case ('politicas') {
              <div class="panel-heading"><h1>POLÍTICAS Y CONDICIONES</h1></div>
              <img class="wide-promo" src="assets/img/menu_tabs/Loyalty-Card.png" alt="Fringe Rewards">
              <article class="policy-content">
                <h2 class="center-text">POLÍTICAS FRINGE</h2>
                <h3>Términos y condiciones</h3>
                <ol>
                  <li>Los puntos acumulados son válidos por 12 meses.</li>
                  <li>Solo el titular registrado puede acumular y canjear puntos.</li>
                  <li>Los puntos no se pueden combinar con otras promociones o descuentos.</li>
                  <li>La reposición de la tarjeta extraviada tiene un cargo de Q50.00.</li>
                </ol>
                <h3>Política de privacidad</h3>
                <p>Tu información está segura con nosotros y se usará exclusivamente para brindarte una mejor experiencia dentro del programa Fringe Rewards.</p>
                <h3>Restricciones</h3>
                <ol>
                  <li>Solo es válido en los salones Fringe Hair &amp; Beauty.</li>
                  <li>Algunos productos o servicios pueden estar sujetos a disponibilidad.</li>
                </ol>
                <p class="center-text">* Aplican restricciones.</p>
              </article>
            }
            @case ('establecimientos') {
              <div class="panel-heading"><h1>ESTABLECIMIENTOS</h1></div>
              <div class="location-grid">
                <article class="location-card">
                  <img src="assets/img/sucursales/Ubicación-Z14.png" alt="Ubicación Fringe Zona 14">
                  <h2>Zona 14 - Matriz</h2>
                  <p>21 calle 5-52 Z14</p>
                  <p>Ciudad de Guatemala, Guatemala</p>
                  <p>Lunes a viernes, 7:00 a.m. a 6:00 p.m.<br>Sábado 7:00 a.m. a 5:00 p.m.</p>
                </article>
                <article class="location-card">
                  <img src="assets/img/sucursales/Ubicación-Carretera.png" alt="Ubicación Fringe Carretera">
                  <h2>Fringe Carretera</h2>
                  <p>km 14.5 Carretera a El Salvador, Santa Catarina Pinula, Finca La Luz, Puerta Parada, casa n.º 600</p>
                  <p>Guatemala</p>
                  <p>Lunes a viernes, 7:00 a.m. a 6:00 p.m.<br>Sábado 7:00 a.m. a 5:00 p.m.</p>
                </article>
              </div>
            }
            @case ('cuenta') {
              <div class="panel-heading account-title"><h1>MI CUENTA</h1></div>
              @if (!accountDemo) {
                <form class="login-form" (submit)="$event.preventDefault(); submitLogin()">
                  <h2>Inicia sesión</h2>
                  <p>Accede a tus puntos, movimientos y datos de Fringe Rewards.</p>
                  <label class="sr-only" for="username">Nombre de Usuario</label>
                  <input id="username" name="c1" autocomplete="username" placeholder="Nombre de Usuario" required maxlength="48">
                  <label class="sr-only" for="password">Contraseña</label>
                  <input id="password" name="c2" type="password" autocomplete="current-password" placeholder="Contraseña" required maxlength="17">
                  <label class="remember"><input type="checkbox" name="remember"> Recordar contraseña</label>
                  <button class="submit" type="submit">Enviar</button>
                  @if (loginMessage) { <p class="form-message" role="status">{{ loginMessage }}</p> }
                  <div class="demo-access">
                    <p>¿Quieres conocer las pantallas de la cuenta?</p>
                    <button class="inline-link" type="button" (click)="openAccountDemo()">Acceder a mi cuenta</button>
                  </div>
                </form>
              } @else {
                <div class="account-portal" (keydown.escape)="closeAccountMenu()">
                  <button class="account-menu-toggle" type="button" aria-controls="account-menu" [attr.aria-expanded]="accountMenuOpen" (click)="toggleAccountMenu()">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                    <span>Menú</span>
                    <span class="account-menu-current">{{ accountPageLabel }}</span>
                  </button>
                  @if (accountMenuOpen) {
                    <button class="account-drawer-backdrop" type="button" aria-label="Cerrar menú de cuenta" (click)="closeAccountMenu()"></button>
                  }
                  <aside id="account-menu" class="account-sidebar" [class.mobile-open]="accountMenuOpen" aria-label="Menú de cuenta">
                    <div class="account-sidebar-heading">
                      <h2>Mi cuenta</h2>
                      <button class="account-menu-close" type="button" aria-label="Cerrar menú de cuenta" (click)="closeAccountMenu()">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
                      </button>
                    </div>
                    <nav>
                      @for (item of accountNavItems; track item.id) {
                        <button type="button" [class.active]="accountPage === item.id" (click)="navigateAccount(item.id)">{{ item.label }}</button>
                      }
                    </nav>
                    <button class="account-exit" type="button" (click)="closeAccountDemo()">Volver al inicio de sesión</button>
                  </aside>
                  <div class="account-content">
                    @if (accountPage === 'inicio') {
                      <header class="account-welcome">
                        <div><span class="account-eyebrow">FRINGE REWARDS</span><h2>Hola, Miembro Fringe</h2></div>
                        <div class="points-badge"><span>Mis puntos</span><strong>128</strong></div>
                      </header>
                    }
                    @if (accountMessage) { <p class="account-notice" role="status">{{ accountMessage }}</p> }
                    @switch (accountPage) {
                      @case ('inicio') {
                        <section class="account-section" aria-label="Resumen de mi cuenta">
                          <dl class="profile-summary">
                            <div><dt>Correo electrónico</dt><dd>miembro&#64;ejemplo.com</dd></div>
                            <div><dt>Teléfono</dt><dd>No registrado</dd></div>
                            <div><dt>Dirección</dt><dd>Agrega tu dirección en Actualizar datos</dd></div>
                            <div><dt>Tarjeta Fringe Rewards</dt><dd>•••• •••• •••• 4821</dd></div>
                          </dl>
                        </section>
                        <section class="account-section">
                          <div class="section-title-row"><h3>Movimientos recientes</h3><button class="text-action" type="button" (click)="navigateAccount('movimientos')">Ver todos</button></div>
                          <div class="account-table-wrap">
                            <table class="account-table">
                              <thead><tr><th>Código</th><th>Establecimiento</th><th>Descripción</th><th>Fecha</th><th>Cargo</th><th>Abono</th><th>Saldo</th></tr></thead>
                              <tbody>
                                @for (movement of recentMovements.slice(0, 5); track movement.code) {
                                  <tr><td>{{ movement.code }}</td><td>{{ movement.location }}</td><td>{{ movement.description }}</td><td>{{ movement.date }}</td><td>{{ movement.charge }}</td><td>{{ movement.credit }}</td><td>{{ movement.balance }}</td></tr>
                                }
                              </tbody>
                            </table>
                          </div>
                        </section>
                      }
                      @case ('movimientos') {
                        <section class="account-section" aria-label="Movimientos de la cuenta">
                          <div class="movement-filters">
                            <label>Desde <input #fromDate type="date" (input)="setMovementRange('from', fromDate.value)"></label>
                            <label>Hasta <input #untilDate type="date" (input)="setMovementRange('until', untilDate.value)"></label>
                            <button class="text-action" type="button" (click)="clearMovementRange(fromDate, untilDate)">Limpiar fechas</button>
                          </div>
                          <div class="account-table-wrap">
                            <table class="account-table">
                              <thead><tr><th>Código</th><th>Establecimiento</th><th>Descripción</th><th>Fecha</th><th>Cargo</th><th>Abono</th><th>Saldo</th></tr></thead>
                              <tbody>
                                @for (movement of pagedMovements; track movement.code) {
                                  <tr><td>{{ movement.code }}</td><td>{{ movement.location }}</td><td>{{ movement.description }}</td><td>{{ movement.date }}</td><td>{{ movement.charge }}</td><td>{{ movement.credit }}</td><td>{{ movement.balance }}</td></tr>
                                } @empty {
                                  <tr><td class="empty-row" colspan="7">No hay movimientos en el período seleccionado.</td></tr>
                                }
                              </tbody>
                            </table>
                          </div>
                          <div class="movement-pagination">
                            <span>Mostrando {{ visibleMovements.length ? (movementPage - 1) * 5 + 1 : 0 }}–{{ movementDisplayEnd }} de {{ visibleMovements.length }} movimientos de ejemplo</span>
                            <nav aria-label="Paginación de movimientos">
                              <button class="pager-button" type="button" aria-label="Página anterior" [disabled]="movementPage === 1" (click)="navigateMovementsPage(movementPage - 1)">
                                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" /></svg>
                                <span>Anterior</span>
                              </button>
                              <span class="pager-status" aria-live="polite">Página <strong>{{ movementPage }}</strong> de {{ movementPageCount }}</span>
                              <button class="pager-button" type="button" aria-label="Página siguiente" [disabled]="movementPage === movementPageCount" (click)="navigateMovementsPage(movementPage + 1)">
                                <span>Siguiente</span>
                                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4.5 5.5 5.5-5.5 5.5" /></svg>
                              </button>
                            </nav>
                          </div>
                        </section>
                      }
                      @case ('password') {
                        <section class="account-section account-form-section" aria-label="Cambiar contraseña">
                          <form class="account-form" (submit)="$event.preventDefault(); showAccountNotice('El servicio para guardar cambios aún no está disponible.')">
                            <label>Contraseña anterior<input type="password" autocomplete="current-password" required></label>
                            <label>Nueva contraseña<input type="password" autocomplete="new-password" placeholder="Nueva contraseña" required minlength="8"></label>
                            <label>Confirmar contraseña<input type="password" autocomplete="new-password" placeholder="Confirma tu nueva contraseña" required minlength="8"></label>
                            <button class="submit" type="submit">Guardar contraseña</button>
                          </form>
                        </section>
                      }
                      @case ('datos') {
                        <section class="account-section account-form-section" aria-label="Actualizar datos">
                          <form class="account-form profile-form" (submit)="$event.preventDefault(); showAccountNotice('El servicio para guardar cambios aún no está disponible.')">
                            <label>Nombre<input type="text" autocomplete="given-name" placeholder="Tu nombre" required></label>
                            <label>Apellido<input type="text" autocomplete="family-name" placeholder="Tu apellido" required></label>
                            <label>Dirección<input type="text" autocomplete="street-address" placeholder="Tu dirección"></label>
                            <label>Teléfono<input type="tel" autocomplete="tel" placeholder="Teléfono"></label>
                            <label>Teléfono móvil<input type="tel" autocomplete="tel-national" placeholder="Teléfono móvil"></label>
                            <label>Correo electrónico<input type="email" autocomplete="email" placeholder="correo@ejemplo.com" required></label>
                            <button class="submit" type="submit">Guardar datos</button>
                          </form>
                        </section>
                      }
                      @case ('establecimientos') {
                        <section class="account-section" aria-label="Establecimientos Fringe">
                          <div class="account-locations">
                            <article><img src="assets/img/sucursales/Ubicación-Z14.png" alt=""><div><h4>Fringe Zona 14</h4><p>21 calle 5-52, Zona 14<br>Ciudad de Guatemala</p><p>Lunes a viernes, 7:00 a.m. a 6:00 p.m.<br>Sábado, 7:00 a.m. a 5:00 p.m.</p></div></article>
                            <article><img src="assets/img/sucursales/Ubicación-Carretera.png" alt=""><div><h4>Fringe Carretera</h4><p>km 14.5 Carretera a El Salvador, Santa Catarina Pinula</p><p>Lunes a viernes, 7:00 a.m. a 6:00 p.m.<br>Sábado, 7:00 a.m. a 5:00 p.m.</p></div></article>
                          </div>
                        </section>
                      }
                      @case ('premios') {
                        <section class="account-section" aria-label="Premios y recompensas">
                          <p class="rewards-intro">Canjea tus puntos por recompensas y experiencias Fringe.</p>
                          <div class="account-rewards">
                            <article><img src="assets/img/menu_tabs/Loyalty-Card.png" alt=""><h4>Descuento en tu próxima visita</h4><p>Una recompensa para disfrutar tu próxima experiencia Fringe.</p><span>Desde 100 puntos</span><button type="button" disabled>Próximamente</button></article>
                            <article><img src="assets/img/menu_tabs/Loyalty-Card.png" alt=""><h4>Tratamiento capilar</h4><p>Consiente tu cabello con uno de nuestros servicios favoritos.</p><span>Desde 250 puntos</span><button type="button" disabled>Próximamente</button></article>
                            <article><img src="assets/img/menu_tabs/Loyalty-Card.png" alt=""><h4>Producto de cuidado</h4><p>Elige un detalle especial para continuar tu rutina en casa.</p><span>Desde 400 puntos</span><button type="button" disabled>Próximamente</button></article>
                          </div>
                        </section>
                      }
                    }
                  </div>
                </div>
              }
            }
            @case ('contacto') {
              <div class="panel-heading"><h1>CONTÁCTANOS</h1></div>
              <div class="contact-layout">
                <form class="contact-form" (submit)="$event.preventDefault(); submitContact()">
                  <label>*Nombres<input required name="c1" maxlength="25"></label>
                  <label>*Apellidos<input required name="c2" maxlength="25"></label>
                  <label>Teléfono<input name="c3" maxlength="8" inputmode="numeric" title="Ejemplo de formato: 22224444"></label>
                  <label>*Correo electrónico<input required type="email" name="c4" maxlength="50" title="Ejemplo de formato: correo@correo.com"></label>
                  <label>*N.º de tarjeta de cliente<input required name="c5" maxlength="16"></label>
                  <label>*Mensaje<textarea required name="c6" rows="5" maxlength="150"></textarea></label>
                  <button class="submit" type="submit">Enviar</button>
                  @if (contactMessage) { <p class="form-message">{{ contactMessage }}</p> }
                </form>
                <aside class="contact-info">
                  <strong>¿Preguntas? ¿Ideas? ¡Te escuchamos! Envíanos tus comentarios o sugerencias mediante nuestro formulario.</strong>
                  <ul>
                    <li>Fringe Carretera: Tel.: (502) 5588-8642 <a href="https://wa.me/50255888642" target="_blank" rel="noopener">WhatsApp</a></li>
                    <li>Fringe Zona 14: Tel.: (502) 3158-2686 <a href="https://wa.me/50231582686" target="_blank" rel="noopener">WhatsApp</a></li>
                  </ul>
                </aside>
              </div>
            }
          }
        </section>
      }
      <footer class="footer">
        <div class="footer-brand"><img src="assets/img/logo/logo_fringe_footer.png" alt="Fringe"><span>Todos los derechos reservados</span></div>
        <img class="datacode" src="assets/img/DATACODE.png" alt="Datacode">
      </footer>
    </main>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly accountNavItems: { id: AccountPage; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'movimientos', label: 'Mis movimientos' },
    { id: 'password', label: 'Cambiar contraseña' },
    { id: 'datos', label: 'Actualizar datos' },
    { id: 'establecimientos', label: 'Establecimientos' },
    { id: 'premios', label: 'Premios' },
  ];
  readonly recentMovements: AccountMovement[] = [
    { code: 'FR-1048', location: 'Fringe Zona 14', description: 'Compra de servicios', date: '2026-10-28', charge: 'Q0.00', credit: '12', balance: '128' },
    { code: 'FR-1032', location: 'Fringe Carretera', description: 'Compra de productos', date: '2026-10-12', charge: 'Q0.00', credit: '8', balance: '116' },
    { code: 'FR-1019', location: 'Fringe Zona 14', description: 'Canje de recompensa', date: '2026-09-25', charge: '30', credit: 'Q0.00', balance: '108' },
    { code: 'FR-1004', location: 'Fringe Carretera', description: 'Compra de servicios', date: '2026-09-08', charge: 'Q0.00', credit: '18', balance: '138' },
    { code: 'FR-0987', location: 'Fringe Zona 14', description: 'Compra de productos', date: '2026-08-21', charge: 'Q0.00', credit: '10', balance: '120' },
    { code: 'FR-0971', location: 'Fringe Carretera', description: 'Compra de servicios', date: '2026-08-03', charge: 'Q0.00', credit: '14', balance: '110' },
    { code: 'FR-0945', location: 'Fringe Zona 14', description: 'Canje de recompensa', date: '2026-07-18', charge: '20', credit: 'Q0.00', balance: '96' },
    { code: 'FR-0912', location: 'Fringe Carretera', description: 'Compra de productos', date: '2026-07-02', charge: 'Q0.00', credit: '9', balance: '116' },
  ];
  readonly navItems: { id: Section; label: string }[] = [
    { id: 'inicio', label: 'INICIO' }, { id: 'acerca', label: 'ACERCA DE' },
    { id: 'beneficios', label: 'BENEFICIOS' }, { id: 'politicas', label: 'POLÍTICAS' },
    { id: 'establecimientos', label: 'ESTABLECIMIENTOS' }, { id: 'cuenta', label: 'MI CUENTA' },
    { id: 'contacto', label: 'CONTÁCTANOS' },
  ];
  readonly slides = ['assets/img/slider/SLIDE4.png', 'assets/img/slider/SLIDE2.png', 'assets/img/slider/SLIDE3.png', 'assets/img/slider/SLIDE1.png'];
  section: Section = 'inicio';
  slide = 0;
  controlsVisible = false;
  private readonly changeDetector = inject(ChangeDetectorRef);
  loginMessage = '';
  contactMessage = '';
  accountDemo = false;
  accountPage: AccountPage = 'inicio';
  accountMenuOpen = false;
  accountMessage = '';
  movementFrom = '';
  movementUntil = '';
  movementPage = 1;
  private controlsTimer: ReturnType<typeof setTimeout> | undefined;
  private slideTimer: ReturnType<typeof setInterval> | undefined;

  get visibleMovements(): AccountMovement[] {
    return this.recentMovements.filter((movement) =>
      (!this.movementFrom || movement.date >= this.movementFrom) &&
      (!this.movementUntil || movement.date <= this.movementUntil),
    );
  }

  get pagedMovements(): AccountMovement[] {
    const start = (this.movementPage - 1) * 5;
    return this.visibleMovements.slice(start, start + 5);
  }

  get movementPageCount(): number {
    return Math.max(1, Math.ceil(this.visibleMovements.length / 5));
  }

  get movementDisplayEnd(): number {
    return Math.min(this.movementPage * 5, this.visibleMovements.length);
  }

  get accountPageLabel(): string {
    return this.accountNavItems.find((item) => item.id === this.accountPage)?.label ?? 'Mi cuenta';
  }

  ngOnInit(): void {
    this.startSlideRotation();
  }

  navigate(section: Section): void {
    this.section = section;
    if (section === 'inicio') {
      this.startSlideRotation();
    } else {
      this.stopSlideRotation();
    }
    this.loginMessage = '';
    this.contactMessage = '';
    this.accountMessage = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  moveSlide(direction: number): void {
    this.slide = (this.slide + direction + this.slides.length) % this.slides.length;
    this.startSlideRotation();
  }

  selectSlide(index: number): void {
    this.slide = index;
    this.startSlideRotation();
  }

  private startSlideRotation(): void {
    this.stopSlideRotation();
    if (this.section !== 'inicio') return;
    this.slideTimer = setInterval(() => {
      this.slide = (this.slide + 1) % this.slides.length;
      this.changeDetector.markForCheck();
    }, 5000);
  }

  private stopSlideRotation(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
    this.slideTimer = undefined;
  }

  showControls(): void {
    this.controlsVisible = true;
    if (this.controlsTimer) clearTimeout(this.controlsTimer);
    this.controlsTimer = setTimeout(() => {
      this.controlsVisible = false;
      this.controlsTimer = undefined;
      this.changeDetector.markForCheck();
    }, 1200);
  }

  hideControls(): void {
    if (this.controlsTimer) clearTimeout(this.controlsTimer);
    this.controlsTimer = undefined;
    this.controlsVisible = false;
  }

  ngOnDestroy(): void {
    if (this.controlsTimer) clearTimeout(this.controlsTimer);
    this.stopSlideRotation();
  }

  submitLogin(): void {
    this.loginMessage = 'El inicio de sesión requiere el servicio de autenticación del portal Fringe Rewards.';
  }

  openAccountDemo(): void {
    this.accountDemo = true;
    this.accountPage = 'inicio';
    this.accountMessage = '';
    this.movementFrom = '';
    this.movementUntil = '';
    this.movementPage = 1;
  }

  closeAccountDemo(): void {
    this.accountDemo = false;
    this.accountMenuOpen = false;
    this.accountMessage = '';
  }

  navigateAccount(page: AccountPage): void {
    this.accountPage = page;
    this.accountMenuOpen = false;
    this.accountMessage = '';
  }

  toggleAccountMenu(): void {
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  closeAccountMenu(): void {
    this.accountMenuOpen = false;
  }

  setMovementRange(range: 'from' | 'until', value: string): void {
    if (range === 'from') this.movementFrom = value;
    else this.movementUntil = value;
    this.movementPage = 1;
  }

  clearMovementRange(fromDate: HTMLInputElement, untilDate: HTMLInputElement): void {
    this.movementFrom = '';
    this.movementUntil = '';
    this.movementPage = 1;
    fromDate.value = '';
    untilDate.value = '';
  }

  navigateMovementsPage(page: number): void {
    this.movementPage = Math.min(Math.max(1, page), this.movementPageCount);
  }

  showAccountNotice(message: string): void {
    this.accountMessage = message;
  }

  submitContact(): void {
    this.contactMessage = 'El formulario original requiere el servicio de correo del portal para enviar el mensaje.';
  }
}
