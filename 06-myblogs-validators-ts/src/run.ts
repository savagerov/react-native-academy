let $ = jQuery;

class onFocus {

    private run: number | undefined;

    constructor(){
        var $this = this;
        $this.run = $this.init();
    }

    public init():number {
        var $this = this;
        $(document).ready(function () {
            $this.addFocusClass();
            $this.keyUpObserve();
            $this.clickLink();
        });
        return 0;
    }

    private addFocusClass():void {
        $(".form-control").focus( () => {
            $(this).prev().addClass("on-focus");
        }).focusout(function () {
            $(".form-label").removeClass("on-focus");
        })
    }

    private keyUpObserve():void {
        $(".form-control").keyup( () => {
            if ($(this).val().length > 0) {
                $(this).prev().addClass("filled");
            } else {
                $(this).prev().removeClass("filled");
            }
        })
    }

    private clickLink():void {
        $(".link").click( () => {
            var open = $(this).data("open");
            var close = $(this).data("close");

            $("#" + close).animate({
                'opacity': 0,
                'top':+100
            },500 ,  () => {
                $(this).removeClass("open").addClass("close").removeAttr("style");
                $("#" + open).removeClass("close").addClass("open");

            })

        });
    }

}

var run = new onFocus();