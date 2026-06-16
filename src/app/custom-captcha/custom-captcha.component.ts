import { Component, forwardRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CaptchaService } from 'src/shared/service/captcha.service';

@Component({
  selector: 'capp-captcha',
  template: `
    <div class="captcha-wrap">
      <div class="captcha-box" [class.shake]="isShaking">
        <div class="captcha-image" [innerHTML]="safeSvg"></div>
        <button type="button" class="refresh-btn" (click)="refresh()" title="Refresh captcha">⟳</button>
      </div>

      <input class="captcha-input" type="text"
             placeholder="Enter captcha"
             (input)="onInput($event)"
             [value]="value" />
    </div>
  `,
  styles: [`
    .captcha-wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 320px;
      width: 100%;
    }

    .captcha-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border: 1px solid #e0e0e0;     /* outer box border */
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    /* key: make the svg fill the box completely (no inner border) */
    .captcha-image {
      flex: 1;
      height: 52px;            /* fixed visual height of the captcha area */
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    /* ensure any SVG returned by server fills container */
    .captcha-image svg {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .refresh-btn {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      background: #f4f4f4;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: background .12s ease;
    }
    .refresh-btn:hover { background: #e7e7e7; }

    .captcha-input {
      width: 100%;
      padding: 10px 12px;
      border-radius: 4px;
      border: 1px solid #d0d0d0;
      font-size: 14px;
      box-sizing: border-box;
    }
    @keyframes shake {
    0% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-5px);
    }

    40% {
        transform: translateX(5px);
    }

    60% {
        transform: translateX(-5px);
    }

    80% {
        transform: translateX(5px);
    }

    100% {
        transform: translateX(0);
    }
}

.shake {
    animation: shake 0.4s ease;
}
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomCaptchaComponent),
    multi: true
  }]
})
export class CustomCaptchaComponent implements OnInit, ControlValueAccessor {
  captchaId: string | null = null;
  svgMarkup = '';
  safeSvg: SafeHtml = '';
  value = '';
  isShaking = false;


  onTouched = () => { };
  onChange: (v: any) => void = () => { };

  constructor(private svc: CaptchaService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void { this.refresh(); }

  refresh() {
    this.svc.get_newCaptcha().subscribe({
      next: (r: any) => {
        this.captchaId = r.captchaId;
        this.svgMarkup = r.svg ?? '';
        // trust only your server's svg (sanitize by bypassing Angular's sanitizer)
        this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(this.svgMarkup);
        this.value = '';
        this.onChange(this.getValueForParent());
      },
      error: err => {
        console.error('Captcha refresh error', err);
      }
    });
  }

  onInput(v: any) {
    this.value = v.target.value;
    this.onChange(this.getValueForParent());
  }

  private getValueForParent() {
    return { captchaId: this.captchaId, answer: this.value };
  }

  // ControlValueAccessor
  writeValue(obj: any): void {
    if (!obj) return;
    this.captchaId = obj.captchaId ?? this.captchaId;
    this.value = obj.answer ?? this.value;
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { /* optional */ }

  triggerShake() {
    this.isShaking = true;
    setTimeout(() => this.isShaking = false, 400); // reset after animation
}
}