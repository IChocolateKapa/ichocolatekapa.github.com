/**
 * Created by Echo on 2015/10/23.
 */
var progressBar = {
    initProgressBar: function($ele, cfg){
        this.cfg = {
            title: {
                show: true,
                style: {
                    color: "#000",
                    "background-color": "#fff"
                }
            },
            height: '25',
            width: "100%",
            progressBackground: {
                "background": "#fff",
                "border": "1px solid #fff",
                "borderRadius": "5px",
                "boxShadow": "inset 1px 0 1px 2px rgba(0, 0, 0, 0.1), 1px 0 1px 2px #eeeeee"
            },
            barColor: "#337ab7",
            border: "",
            striped: false,
            linear: {
                show: false,
                theme: "blue"
            },
            name: "root",
            percentage: 0
        };

        $.extend(true, this.cfg, cfg);


        var percent = this.cfg.percentage;
        var barColor = this.cfg.barColor;

        /*if($("html").find("head").html().indexOf("css/progressBar.css") == -1){
         $("head").prepend("<link rel=\"stylesheet\" href=\"css/progressBar.css\"/>");
         }*/


        var contentHTML = "<div class=\"progress\">"
            + "<div class=\"progress-bar\">"
            + "<span>" + this.cfg.name + "</span>"
            + "</div>"
            + "</div>";

        if(this.cfg.title.show){
            contentHTML += "<div class=\"progress-title\">"
                + "<span>" + percent + "%</span>"
                + " </div>";
        }
        $ele.empty();
        $ele.html(contentHTML);
        if(this.cfg.progressBackground){
            var backColor = this.cfg.progressBackground.background;
            var backBorder = this.cfg.progressBackground.border;
            var borderRadius = this.cfg.progressBackground.borderRadius;
            var boxShadow = this.cfg.progressBackground.boxShadow;
            $ele.find(".progress").css({'background-color': backColor, "border": backBorder, "border-radius": borderRadius, "box-shadow": boxShadow, "-webkit-box-shadow": boxShadow});
        }

        if(this.cfg.striped){
            $ele.find(".progress-bar").addClass("progress-bar-striped");
        }
        if(this.cfg.linear.show){
            $ele.find(".progress-bar").addClass("progress-bar-linear-"+this.cfg.linear.theme);
        }
        setTimeout(function(){
            $ele.find(".progress-bar").css({"background-color": barColor})
                .animate({'width': percent +"%"});
        }, 50);
    }
};