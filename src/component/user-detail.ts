import { MobxLitElement } from '@adobe/lit-mobx';
import { Router } from '@vaadin/router';
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { User } from '../assets/interfaces';
import { userStore } from '../store/user-store';
import './my-button';

@customElement('user-detail')
export class UserDetail extends MobxLitElement {
  @property({ type: Object }) location: any;
  @property({ type: Object }) user?: User;

  static styles = css`
    * {
      padding: 0;
      margin: 0;
    }
    .title {
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 3rem;
      border-bottom: 1px solid #e4e4e4;
    }
    .wrapper {
      display: flex;
      margin-left: 5rem;
      gap: 1.5rem;
      font-size: 1.5rem;
    }
    .img-wrapper {
      height: 20rem;
      width: 20rem;
    }
    .img-wrapper img {
      height: 100%;
      width: 100%;
      border-radius: 2rem;
    }
    .details {
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
    }
    .detail {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .detail__title {
      font-weight: 700;
      font-size: 1.1em;
    }
    .text {
      font-weight: 700;
      text-transform: uppercase;
      color: #4e4e4e;
    }
    .buttons {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      gap: 1rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  `;
  connectedCallback(): void {
    super.connectedCallback();
    this.user = userStore.getUser(Number(this.location.params.id));
  }

  handleDelete(id: number) {
    userStore.deleteUser(id);
    Router.go('/');
  }
  handleEdit(id: number) {
    Router.go(`/edit-user/${id}`);
  }
  protected render(): unknown {
    return html`
      <h1 class="title">Detail</h1>
      <div class="wrapper">
        <div class="img-wrapper">
          <img src="${ifDefined(this.user?.avatar)}" />
        </div>
        <div class="details">
          <div class="detail">
            <p class="detail__title">Full Name:</p>
            <p class="text">${this.user?.firstName} ${this.user?.lastName}</p>
          </div>
          <div class="detail">
            <p class="detail__title">Email:</p>
            <p class="text">${this.user?.email}</p>
          </div>
          <div>${this.user?.description}</div>
          <div class="buttons">
            <my-button
              @click=${() => Router.go(`/add-desc/${this.user!.id}`)}
              value="Add description"
            ></my-button>
            <my-button
              value="Edit"
              @click=${() => this.handleEdit(this.user!.id)}
              color="#ab7002"
            >
            </my-button>
            <my-button
              @click=${() => this.handleDelete(this.user!.id)}
              value="Delete"
              color="#ef4343"
            >
            </my-button>
          </div>
        </div>
      </div>
    `;
  }
}
