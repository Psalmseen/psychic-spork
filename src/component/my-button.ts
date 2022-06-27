import { html, css, LitElement, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('my-button')
export class MyButton extends LitElement {
  @property({ type: String }) value!: string;
  @property({ type: String }) color = '#333';
  static styles: CSSResultGroup = css`
    button {
      all: unset;
      color: #ddd;
      justify-self: end;
      border-radius: 8px;
      padding: 0.75rem 2rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 2rem auto;
      font-weight: 700;
      display: block;
    }
    button {
      transform: scale(1.05);
    }
  `;
  protected render(): unknown {
    return html`<button style=${styleMap({ backgroundColor: this.color })}>
      ${this.value}
    </button>`;
  }
}
