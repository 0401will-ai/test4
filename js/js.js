$(function () {
    let islog = false;
    const app = {
        toast(message, type = "success", delay = 4000) {
            const all = ["success", "primary", "secondary", "warning", "danger"];
            const ait = all.includes(type) ? type : "success";
            let $box = $(".app-t");
            if (!$box.length) {
                $box = $(` <div class="app-t pf z-max bottom-0 start-0 m-md-5 m-3 p-3"></div> `).appendTo("body");
            }
            const $t = $(`
    <div class="toast shadow my-1 text-bg-${ait}" style="width: 300px;">
        <div class="d-fxcc jcs">
            <div class="toast-body"></div>
            <div class="m-auto me-2">
                <button class="btn-close" data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>                
                `).appendTo($box);
            $t.find(".toast-body").html(message);
            const newtoast = new bootstrap.Toast($t[0], delay);
            $t.one("hidden.bs.toast", () => $t.remove());
            newtoast.show();
        }
    };
    function rlog() {
        if (islog) {
            return true;
        }
        app.toast('請先登入會員，才能使用這個功能。   <button class="btn border t-c0 rounded-pill toastlogin" data-bs-dismiss="toast">一鍵登入</button>', "danger");
    }
    function setlog(loggedIn) {
        islog = loggedIn;
        const $logbtn = $(".logbtn");
        if (loggedIn) {
            $logbtn.removeClass("bg-c1").addClass("bg-success").html('<i class="fa-solid fa-user me-1"></i>登出');
            app.toast("登入成功，歡迎回來。", "primary");
            $("#user").modal("show");
        } else {
            $logbtn.removeClass("bg-c1").addClass("bg-success").html('<i class="fa-solid fa-user me-1"></i>登入');
            app.toast("您已登出，期待下次再見。", "secondary");
        }
        $("#aimsg,#aibtnmsg").prop("disabled",!loggedIn);
        $("#aimsg").attr("placeholder",loggedIn?"請輸入訊息":"請先登入會員");
    }
    $(".logbtn").on("click", function () {
        if (islog) {
            setlog(false);
            return;
        }
        setlog(true);
    });
    $(document).on("click", ".toastlogin", function () {
        setlog(true);
    });


    $(window).on("scroll", function () {
        const $h = $(".header");
        const a = this.scrollY > 10;
        const aa = this.scrollY > 500;
        $h
            .toggleClass("a1", a)
            .toggleClass("a2", !a);
        if (aa) {
            $(".top").fadeIn(400);
        } else {
            $(".top").fadeOut(400);
        }
    }).trigger("scroll");
    function r() {
        $(".resveal , .resveal1 , .resveal2 , .resveal21 , .resveal3 , .resveal31 , .resveal01 ").each(function () {
            const tot = $(this).offset().top;
            const wstwh = $(window).scrollTop() + $(window).height();
            if (tot < wstwh - 40) {
                $(this).addClass("r-show");
            } else {
                $(this).removeClass("r-show");
            }
        });
    }
    $(window).on("scroll load", r);
    function num() {
        const $ns = $(".numbers");
        if (!$ns.length === 0) {
            return;
        }
        const tot = $ns.offset().top;
        const wstwh = $(window).scrollTop() + $(window).height();
        if (tot < wstwh - 100) {
            const $num = $ns.find(".num");
            $num.each(function () {
                const $n = $(this);
                const $nd = $n.data("num");
                $({ number: 0 }).animate({ number: $nd }, {
                    duration: 4000,
                    step: function () {
                        $n.text(Math.floor(this.number));
                    },
                    complete: function () {
                        $n.text($nd);
                    }
                });
            });
            $(window).off("scroll load", num);
        }
    }
    $(window).on("scroll load", num);


    $(".addbuy").on("click",function () {
        if (!rlog()) {
            return;
        }
        $("#buyyes").modal("show");
    });

    const md = [
        {
            name: "台北馬力歐",
            text: "好逛好逛",
            likes: 45
        },
    ];
    const $name = $("#name");
    const $text = $("#text");
    const $msgs = $(".msgs");
    function esh(text) {
        return $("<div>").text(text).html();
    }
    function ct(data) {
        const hn = data.name.charAt(0);
        const left = Math.floor(Math.random() * 80) + "%";
        const move = Math.floor(Math.random() * 80) + "px";
        const time = Math.floor(Math.random() * 20) + 5 + "s";
        const $msgbox = $(`
                <div class="msg card pa z-0 rounded-4 shadow p-3 bg-wt blur" style="
                    --left:${left};
                    --move:${move};
                    --time:${time};
                    ">
                <div class="d-fxcc jcs">
                    <div class="d-fxcc rounded-pill bg-gra shadow t-c0" style="width: 40px;height: 40px;">
                        ${esh(hn)}
                    </div>
                    <div class="px-2">
                        <div class="fw-bolder">${esh(data.name)} </div>
                        <div class="" style="transform: scale(0.8);">剛剛</div>
                    </div>
                </div>    
                <div class="t-bt fw-bold opacity-75">
                    ${esh(data.text)}
                </div>
                <div class="d-fxcc jce">
                    <button class="btn border-0 like t-bt">
                        <span>${esh(data.likes)} </span>
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                </div>            
            `);
        $msgs.append($msgbox);
        $msgbox.one("animationend", function () {
            $(this).remove();
        });
    }
    md.forEach(function (message, index) {
        setTimeout(() => {
            ct(message);
        }, index * 700);
    });
    setInterval(() => {
        const ran = md[Math.floor(Math.random() * md.length)];
        ct({
            name: ran.name,
            text: ran.text,
            likes: ran.likes,
        });
    }, 1000);
    function msg() {
        if (!rlog()) {
            return;
        }
        const name = $name.val().trim();
        const text = $text.val().trim();
        let v = true;
        if (!name) {
            $name.addClass("is-invalid");
            v = false;
        } else {
            $name.removeClass("is-invalid");
        }
        if (!text) {
            $text.addClass("is-invalid");
            v = false;
        } else {
            $text.removeClass("is-invalid");
        }
        if (!v) {
            return;
        }
        const newmsg = {
            name: name,
            text: text,
            likes: 0
        };
        md.push(newmsg);
        ct(newmsg);
        $name.val("");
        $text.val("");
        $("#msgcard").collapse("hide");
    }
    $(".msgcard").on("click", function () {
        if (!rlog()) {
            return;
        }
        $("#msgcard").collapse("toggle");
    });
    $name.keypress(function (e) {
        if (e.which === 13) {
            $text.focus();
        }
    });
    $name.keypress(function (e) {
        if (e.which === 13) {
            msg();
        }
    });
    $(".msgbtn").on("click", function () {
        msg();
    });
$msgs.on("click",".like",function () {
    const $btn=$(this);
    const $num=$btn.find("span");
    let num=parseInt($num.text(),10);
    if ($btn.hasClass("t-r")) {
        $btn.toggleClass("t-r t-bt");
        num--;
    } else {
        num++;
        $btn.toggleClass("t-r t-bt fa-bounce");
        setTimeout(() => {
            $btn.removeClass("fa-bounce");
        }, 1000);        
    }
    $num.text(num);
});



    $(".aibtn").on("click", function () {
        if (!rlog()) {
            return;
        }
        $(".AI").fadeToggle(500);
    });
    $("#aibtnmsg").on("click", function () {
        smsg();
    });
    $("#aimsg").keypress(function (e) {
        if (e.which === 13) {
            smsg();
        }
    });
    function smsg() {
        if (!rlog()) {
            return;
        }
        let msg = $("#aimsg").val().trim();
        if (!msg) {
            return;
        }
        usermsg(msg);
        setTimeout(() => {
            aimsg(getmsg(msg.toLowerCase()));
        }, 500);
        $("#aimsg").val("");
    }
    function getmsg(input) {
        let rmsg = {
            test: "考試?",
        };
        return rmsg[input] || "您的問題準備進行處理中...";
    }
    function usermsg(text) {
        const $msg = $(`
          <div class="d-fxcc jce">                
                <div class="userbox text-bg-primary p-2 my-1">
                    
                </div>
            </div            
            `);
        $msg.find(".userbox").text(text).append(`
                <i class="fa-solid fa-user mx-1"></i>
                `);
        $(".ax").append($msg);
        scrbottom();
    }
    function aimsg(text) {
        const $msg = $(`
                        <div class="aibox text-bg-dark p-2 my-1">
                <i class="fa-solid fa-robot mx-1"></i>
            </div>
            `);
        $msg.append(document.createTextNode(text));
        $(".ax").append($msg);
        scrbottom();
    }
    function scrbottom() {
        $(".ax").scrollTop($(".ax")[0].scrollHeight);
    }

    let ac = 0;
    const $cards = $(".card3d");
    const cs = $cards.length;
    function card3d() {
        $cards.each(function () {
            const $card = $(this);
            const card = $card.data("in");
            let o = card - ac;
            if (o < -2) {
                o += cs;
            }
            if (o > 2) {
                o -= cs;
            }
            if (o === 2) {
                $card.css({
                    "transform": " translateX(100%) scale(0.5) rotateY(-55deg)",
                    "opacity": "0.3",
                    "z-index": "1",
                });
            }
            else if (o === 1) {

                $card.css({
                    "transform": " translateX(50%) scale(0.7) rotateY(-35deg)",
                    "opacity": "0.6",
                    "z-index": "2",
                });
            }
            else if (o === 0) {

                $card.css({
                    "transform": " translateX(0%) scale(1) rotateY(0deg)",
                    "opacity": "1",
                    "z-index": "5",
                });
            }
            else if (o === -1) {
                $card.css({
                    "transform": " translateX(-50%) scale(0.7) rotateY(35deg)",
                    "opacity": "0.6",
                    "z-index": "2",
                });

            }
            else if (o === -2) {
                $card.css({
                    "transform": " translateX(-100%) scale(0.5) rotateY(55deg)",
                    "opacity": "0.3",
                    "z-index": "1",
                });

            }
            else {
                $card.css({
                    "transform": " translateX(0%) scale(0) rotateY(0deg)",
                    "opacity": "0",
                    "z-index": "0",
                });

            }
        });
    }
    card3d();
    $("#btn3dprev").on("click", function () {
        ac = (ac + 1) % cs;
        card3d();
    });
    $("#btn3dnext").on("click", function () {
        ac = (ac - 1) % cs;
        card3d();
    });
});