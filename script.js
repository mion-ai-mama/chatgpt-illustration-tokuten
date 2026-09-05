/**
 * ============================================================
 * script.js — ページの動き（コピー機能・画像の代替表示など）
 * ============================================================
 * 文章やプロンプトを変更したい場合は index.html を直接編集してください。
 * このファイルは基本的に編集不要です。
 * ============================================================
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     コピー機能（クリップボードAPI／古いブラウザ向けの代替あり）
  ------------------------------------------------------------ */
  function legacyCopy(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (e) {
      return false;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => legacyCopy(text)
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function showToast(message) {
    let toast = document.getElementById("copy-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "copy-toast";
      toast.className = "copy-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toast._hideTimeout);
    toast._hideTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  // 手動でコピーしやすいよう、対象テキストを選択状態にする（コピー失敗時の補助）
  function selectText(el) {
    try {
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      // 選択に失敗しても致命的ではないため何もしない
    }
  }

  function bindCopyDelegation() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".copy-btn[data-copy-target]");
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;

      copyText(target.textContent).then((ok) => {
        window.clearTimeout(btn._copyTimeout);
        btn.classList.remove("is-copied", "is-failed");

        if (ok) {
          showToast("コピーしました！");
          btn.classList.add("is-copied");
          btn._copyTimeout = window.setTimeout(() => btn.classList.remove("is-copied"), 2200);
        } else {
          showToast("コピーできませんでした。文章を選択してコピーしてください");
          btn.classList.add("is-failed");
          btn._copyTimeout = window.setTimeout(() => btn.classList.remove("is-failed"), 2200);
          selectText(target);
        }
      });
    });
  }

  /* ------------------------------------------------------------
     画像が未配置・読み込み失敗のときに、薄い背景色とファイル名の
     プレースホルダーへ差し替える（レイアウトを崩さないため）
  ------------------------------------------------------------ */
  function setupImageFallbacks() {
    document.querySelectorAll(".compare-item__frame img").forEach((img) => {
      img.addEventListener(
        "error",
        function () {
          const wrap = img.closest(".compare-item__frame");
          const filename = img.getAttribute("src") || "";
          const placeholder = document.createElement("div");
          placeholder.className = "compare-item__placeholder";
          placeholder.textContent = filename;
          if (wrap) {
            wrap.innerHTML = "";
            wrap.appendChild(placeholder);
          }
        },
        { once: true }
      );
    });

    // CTAバナー画像が読み込めなかった場合は、通常のテキストボタンに切り替える
    const ctaBtn = document.getElementById("cta-button");
    if (ctaBtn) {
      const img = ctaBtn.querySelector("img");
      if (img) {
        img.addEventListener(
          "error",
          () => {
            ctaBtn.classList.remove("cta-card__banner-link");
            ctaBtn.classList.add("btn", "btn--primary");
            ctaBtn.textContent = "AIマネタイズの教科書を受け取る";
          },
          { once: true }
        );
      }
    }
  }

  /* ------------------------------------------------------------
     初期化
  ------------------------------------------------------------ */
  function init() {
    bindCopyDelegation();
    setupImageFallbacks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
