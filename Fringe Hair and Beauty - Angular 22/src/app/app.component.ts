import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';

type Section = 'inicio' | 'acerca' | 'beneficios' | 'politicas' | 'establecimientos' | 'cuenta' | 'contacto';

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
                <button type="button" [class.selected]="slide === i" [attr.aria-label]="'Ver imagen ' + (i + 1)" (click)="slide = i"></button>
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
                <p>¡Bienvenida a Fringe Rewards! Un programa hecho para ti, que siempre confías en nosotras para verte y sentirte espectacular. Acumula puntos cada vez que nos visitas y transforma tu Fringe Experiencia en Q´s, descuentos y más momentos Fringe.</p>
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
                <p>En Fringe Hair &amp; Beauty sabemos que cada visita es especial, y queremos que esa fidelidad sea recompensada. Fringe Rewards nació como una forma de agradecer tu preferencia con beneficios que te enamorará aún más de la experiencia Fringe.</p>
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
                <h2>BENEFICIOS &amp; RECOMPENSAS</h2>
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
                <h3>Términos &amp; Condiciones</h3>
                <ol>
                  <li>Los puntos acumulados son válidos por 12 meses.</li>
                  <li>Solo el titular registrado puede acumular y canjear puntos.</li>
                  <li>Los puntos no se pueden combinar con otras promociones o descuentos.</li>
                  <li>Reposición de tarjeta extraviada tiene un cargo de Q50.00</li>
                </ol>
                <h3>Política de privacidad</h3>
                <p>Tu información está segura con nosotros y se usará exclusivamente para brindarte una mejor experiencia dentro del programa Fringe Rewards.</p>
                <h3>Restricciones</h3>
                <ol>
                  <li>Solo válido en salones Fringe Hair &amp; Beauty.</li>
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
                  <p>Ciudad Guatemala, Guatemala</p>
                  <p>Lunes a viernes, 7:00 a.m. a 6:00 p.m.<br>Sábado 7:00 a.m. a 5:00 p.m.</p>
                </article>
                <article class="location-card">
                  <img src="assets/img/sucursales/Ubicación-Carretera.png" alt="Ubicación Fringe Carretera">
                  <h2>Fringe Carretera</h2>
                  <p>Km 14.5 Carretera a El Salvador, Santa Catarina Pinula, Finca La Luz, Puerta Parada, Casa # 600</p>
                  <p>Guatemala</p>
                  <p>Lunes a viernes, 7:00 a.m. a 6:00 p.m.<br>Sábado 7:00 a.m. a 5:00 p.m.</p>
                </article>
              </div>
            }
            @case ('cuenta') {
              <div class="panel-heading"><h1>MI CUENTA</h1></div>
              <form class="login-form" (submit)="$event.preventDefault(); submitLogin()">
                <label class="sr-only" for="username">Nombre de Usuario</label>
                <input id="username" name="c1" autocomplete="username" placeholder="Nombre de Usuario" required maxlength="48">
                <label class="sr-only" for="password">Contraseña</label>
                <input id="password" name="c2" type="password" autocomplete="current-password" placeholder="Contraseña" required maxlength="17">
                <label class="remember"><input type="checkbox" name="remember"> Recordar contraseña</label>
                <button class="submit" type="submit">Enviar</button>
                @if (loginMessage) { <p class="form-message">{{ loginMessage }}</p> }
              </form>
            }
            @case ('contacto') {
              <div class="panel-heading"><h1>CONTÁCTANOS</h1></div>
              <div class="contact-layout">
                <form class="contact-form" (submit)="$event.preventDefault(); submitContact()">
                  <label>*Nombres<input required name="c1" maxlength="25"></label>
                  <label>*Apellidos<input required name="c2" maxlength="25"></label>
                  <label>Teléfono<input name="c3" maxlength="8" inputmode="numeric" title="Ejemplo de formato: 22224444"></label>
                  <label>*E-Mail<input required type="email" name="c4" maxlength="50" title="Ejemplo de formato: correo@correo.com"></label>
                  <label>*No. Tarjeta Cliente<input required name="c5" maxlength="16"></label>
                  <label>*Mensaje<textarea required name="c6" rows="5" maxlength="150"></textarea></label>
                  <button class="submit" type="submit">Enviar</button>
                  @if (contactMessage) { <p class="form-message">{{ contactMessage }}</p> }
                </form>
                <aside class="contact-info">
                  <strong>¿Preguntas? ¿Ideas? ¡Te escuchamos! Envíanos tus comentarios o sugerencias mediante nuestro formulario</strong>
                  <ul>
                    <li>Fringe Carretera: Tel: (502) 5588-8642 <a href="https://wa.me/50255888642" target="_blank" rel="noopener">WhatsApp</a></li>
                    <li>Fringe Zona 14: Tel: (502) 3158-2686 <a href="https://wa.me/50231582686" target="_blank" rel="noopener">WhatsApp</a></li>
                  </ul>
                </aside>
              </div>
            }
          }
        </section>
      }
      <footer class="footer">
        <div class="footer-brand"><img src="assets/img/logo/logo_fringe_footer.jpg" alt="Fringe"><span>Todos los derechos reservados</span></div>
        <img class="datacode" src="assets/img/DATACODE.png" alt="Datacode">
      </footer>
    </main>
  `,
})
export class AppComponent implements OnDestroy {
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
  private controlsTimer: ReturnType<typeof setTimeout> | undefined;

  navigate(section: Section): void {
    this.section = section;
    this.loginMessage = '';
    this.contactMessage = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  moveSlide(direction: number): void {
    this.slide = (this.slide + direction + this.slides.length) % this.slides.length;
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
  }

  submitLogin(): void {
    this.loginMessage = 'El inicio de sesión requiere el servicio de autenticación del portal Fringe Rewards.';
  }

  submitContact(): void {
    this.contactMessage = 'El formulario original requiere el servicio de correo del portal para enviar el mensaje.';
  }
}
