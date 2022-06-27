import { css, CSSResultGroup, html } from 'lit';
import { MobxLitElement } from '@adobe/lit-mobx';
import { customElement, property } from 'lit/decorators.js';
import { userStore } from './store/user-store';
import { Router } from '@vaadin/router';

@customElement('app-index')
export class AppIndex extends MobxLitElement {
  @property({ type: Array }) users = userStore.users;
  connectedCallback(): void {
    super.connectedCallback();
    userStore.fetchUsers();
  }
  static styles?: CSSResultGroup = css`
    :host {
      font-family: 'Avenir';
    }
    .title {
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 3rem;
      border-bottom: 1px solid #e4e4e4;
    }
    .index {
      display: flex;
      max-width: 100%;
      flex-wrap: wrap;
      gap: 3rem;
      width: max-content;
      margin: 2rem auto;
    }
    .img-wrapper {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      cursor: pointer;
    }
    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .img-wrapper img {
      height: 100%;
      border-radius: 50%;
      width: 100%;
      object-fit: cover;
      object-position: cover;
    }
    .username {
      margin: 0;
      color: #4e4e4e;
      font-weight: 900;
      font-size: 2rem;
    }
    .add {
      background-color: #a3a3a3;
      font-size: 8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
  handleImgClick(id: number) {
    Router.go(`/user/${id}`);
  }
  handleAdd() {
    Router.go('/add-user');
  }

  render() {
    return html`
      <h1 class="title">Users</h1>
      <div class="index">
        ${userStore.users?.map(
          ({ firstName, avatar, id }) =>
            html`<div class="user" @click=${() => this.handleImgClick(id)}>
              <div class="img-wrapper">
                <img src="${avatar}" />
              </div>
              <p class="username">${firstName}</p>
            </div>`
        )}
        <div @click=${() => this.handleAdd()} class="img-wrapper add">+</div>
      </div>
      <slot></slot>
    `;
  }
}
