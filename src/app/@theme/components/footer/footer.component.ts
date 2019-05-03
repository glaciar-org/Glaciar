import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Glaciar @ 2019 | Handcrafted by
        <b><a href="https://github.com/glaciar-org" target="_glaciar_github">Pablo Ezequiel</a></b>
    </span>
    <div class="socials">
      <a href="https://github.com/glaciar-org" target="_glaciar_github" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}



// <a href="#" target="_glaciar_twitter" class="ion ion-social-twitter"></a>
