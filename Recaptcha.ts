import { Directive, AfterViewInit, ElementRef} from '@angular/core';

declare var grecaptcha;

@Directive({ selector: '[recaptcha]' })

export class Recaptcha implements AfterViewInit {

    constructor(private el: ElementRef) { }

    type: any;
    key: any;
    position: any;
    clID: any;

    public loadScript(url: string) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (scripts[i].src == url)
                return;
        }

        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        node.defer = false;
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    ngAfterViewInit() {

        this.type = this.el.nativeElement.getAttribute("data-type");
        this.key = this.el.nativeElement.getAttribute("data-key");
        this.position = this.el.nativeElement.getAttribute("data-position");

        this.loadScript("https://www.google.com/recaptcha/api.js?render=explicit");

        this.el.nativeElement.id = "recaptcha";
        this.el.nativeElement.style.height = "74px";

        let t = this;

        let fun = function () {
            if (typeof grecaptcha !== "object" || typeof grecaptcha.render !== "function" || typeof grecaptcha.execute !== "function") {
                setTimeout(fun, 1000);
                return;
            }

            if (t.type == "v2" || !t.type)
                grecaptcha.render('recaptcha', { 'sitekey': t.key })

            if (t.type == "invisible")
                grecaptcha.render('recaptcha', { 'sitekey': t.key, 'size': 'invisible', 'badge': t.position, 'callback': 'grec_call' })

            if (t.type == "v3")
                t.clID = grecaptcha.render('recaptcha', { 'sitekey': t.key, 'size': 'invisible',  'badge': t.position });

        };

        setTimeout(fun, 1000);

    }

    getResponseV3(action, callback) {
        grecaptcha.execute(this.clID, { action: action }).then(function (token) {
            callback.call(undefined, token);
        });
    }

    getResponse(callback) {
        if (this.type == "invisible") {
            window["grec_call"] = function (token) {
                callback.call(undefined, token);
            }
            grecaptcha.execute();
        } else {
            callback.call(undefined, grecaptcha.getResponse());
        }

    }

    reset() {
        grecaptcha.reset();
    }

}
