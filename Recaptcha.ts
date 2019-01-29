import { Directive, AfterViewInit, ElementRef } from '@angular/core';

declare var grecaptcha;

@Directive({ selector: '[recaptcha]' })

export class Recaptcha implements AfterViewInit {

    constructor(private el: ElementRef) { }

    public loadScript(url: string) {

        // https://stackoverflow.com/a/9659297
        
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (scripts[i].src == url)
                return;
        }

        // https://stackoverflow.com/a/38473334

        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        node.defer = false;
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    ngAfterViewInit() {

        //add script
        this.loadScript("https://www.google.com/recaptcha/api.js?render=explicit");

        // set id and get the key
        this.el.nativeElement.id = "recaptcha";
        this.el.nativeElement.style.height = "74px";
        let sitekey = this.el.nativeElement.getAttribute("sitekey");

        // wait a bit to avoid a race condition
        // the element must be rendered before firing Recaptcha

        let fun = function () {
            if(typeof grecaptcha === "undefined" || typeof grecaptcha.render !== "function") {
                setTimeout(fun, 1000);
                return;
            }

            console.log(typeof grecaptcha === "undefined");
            grecaptcha.render('recaptcha', { 'sitekey': sitekey })
        };

        setTimeout(fun, 1000);
    }
}
