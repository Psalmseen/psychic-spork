import { CSSResultGroup, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { userStore } from '../store/user-store';
import { Router } from '@vaadin/router';
import { User } from '../assets/interfaces';
import { ifDefined } from 'lit/directives/if-defined.js';
import './my-button';

@customElement('add-user')
export class AddUser extends MobxLitElement {
  @property({ type: Object }) location: any;
  @property({ type: Boolean }) isEdit = false;
  @property({ type: Object }) private currentUser?: User;
  private email = '';
  private firstName = '';
  private lastName = '';
  private imageUrl = '';
  static styles?: CSSResultGroup = css`
    input {
      display: block;
      padding: 1rem;
      font-size: 1.5rem;
      width: 40vw;
      margin: 2rem auto;
    }
  `;
  protected async firstUpdated() {
    this.isEdit = this.location.pathname.split('/')[1] === 'edit-user';
    if (this.isEdit) {
      this.currentUser = await userStore.fetchUser(this.location.params.id);
    }
  }

  protected render(): unknown {
    return html`
      <input
        placeholder="Email"
        @input=${() => {
          this.handleInput('email');
        }}
        type="email"
        id="email"
        value="${ifDefined(this.currentUser?.email)}"
      />
      <input
        placeholder="First name"
        @change=${() => {
          this.handleInput('fName');
        }}
        value="${ifDefined(this.currentUser?.firstName)}"
        type="text"
        id="fName"
      />
      <input
        placeholder="Last name"
        value="${ifDefined(this.currentUser?.lastName)}"
        @change=${() => {
          this.handleInput('lName');
        }}
        type="text"
        id="lName"
      />
      <input
        placeholder="Image url"
        value="${ifDefined(this.currentUser?.avatar)}"
        @change=${() => {
          this.handleInput('img');
        }}
        type="text"
        id="img"
      />
      <my-button
        @click=${() => {
          !this.isEdit
            ? userStore.createUser({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                avatar: this.imageUrl,
              })
            : userStore.editUser({
                id: this.location.params.id,
                email: this.shadowRoot!.querySelector('#email')!.value,
                firstName: this.shadowRoot?.querySelector('#fName')!.value,
                lastName: this.shadowRoot!.querySelector('#lName')!.value,
                avatar: this.shadowRoot?.querySelector('#img')!.value,
              });
          Router.go('/');
          userStore.fetchUsers();
        }}
        value=${this.isEdit ? 'Edit User' : 'Add User'}
        color="#438934"
      >
      </my-button>
    `;
  }

  handleInput(id: string) {
    switch (id) {
      case 'email':
        const email = this.shadowRoot?.querySelector(
          '#email'
        ) as HTMLInputElement;
        this.email = email.value;
        break;
      case 'fName':
        const fName = this.shadowRoot?.querySelector(
          '#fName'
        ) as HTMLInputElement;
        this.firstName = fName.value;
        break;
      case 'lName':
        const lName = this.shadowRoot?.querySelector(
          '#lName'
        ) as HTMLInputElement;
        this.lastName = lName.value;
        break;
      case 'img':
        const img = this.shadowRoot?.querySelector('#img') as HTMLInputElement;
        this.imageUrl = img.value;
        break;
    }
  }
}
