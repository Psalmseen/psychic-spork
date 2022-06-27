import { html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import './my-button';
import { userStore } from '../store/user-store';
import { Router } from '@vaadin/router';
@customElement('add-desc')
export class AddDesc extends MobxLitElement {
  static styles: CSSResultGroup = css`
    textarea {
      width: 60vw;
      margin: 2rem auto;
      height: 40vh;
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 1rem 2rem;
      line-height: 2;
      font-size: 1.5rem;
    }
  `;
  @property({ type: Object }) location: any;
  handleSubmit() {
    const value = this.shadowRoot!.querySelector('textarea')!.value;
    const id = this.location.params.id;
    userStore.addUserDescription(id, value);
    userStore.fetchUsers();
    Router.go(`/user/${id}`);
  }
  protected render(): unknown {
    return html`<textarea placeholder="Enter your detail here"></textarea>
      <my-button
        @click=${() => this.handleSubmit()}
        value="Add description"
      ></my-button>`;
  }
}
