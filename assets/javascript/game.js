var game = {
    cmd_name            : "",
    userId              : -1,
    defenderId          : -1,
    stage               : 0,
    wins                : 0,
    is_winner           : false,
    is_loser            : false,
    characters          :[
        {
            name            : "BB-8",
            attackPwr       : 30,
            currentAttackPwr: 30,
            baseAttack      : 50,
            cntrAttack      : 40,
            HP              : 150,
            currentHP       : 150,
            img             : "./assets/images/bb-8.jpg",
        },
        {
            name            : "Darth Vader",
            attackPwr       : 25,
            currentAttackPwr: 25,
            baseAttack      : 20,
            cntrAttack      : 20,
            HP              : 455,
            currentHP       : 455,
            img             : "./assets/images/darth-vader.jpg",
        },
        {
            name            : "Luke Skywalker",
            attackPwr       : 20,
            currentAttackPwr: 20,
            baseAttack      : 18,
            cntrAttack      : 19,
            HP              : 229,
            currentHP       : 229,
            img             : "./assets/images/luke-skywalker.jpg",
        },
        {
            name            : "Rey",
            attackPwr       : 40,
            currentAttackPwr: 40,
            baseAttack      : 23,
            cntrAttack      : 30,
            HP              : 275,
            currentHP       : 275,
            img             : "./assets/images/rey.jpg",
        },
        {
            name            : "Kylo Ren",
            attackPwr       : 15,
            currentAttackPwr: 15,
            baseAttack      : 15,
            cntrAttack      : 14,
            HP              : 255,
            currentHP       : 255,
            img             : "./assets/images/kylo-ren.jpg",
        },
        {
            name            : "Emperor Palpatine",
            attackPwr       : 16,
            currentAttackPwr: 16,
            baseAttack      : 12,
            cntrAttack      : 18,
            HP              : 365,
            currentHP       : 365,
            img             : "./assets/images/emperor-palpatine.jpg",
        },
        {
            name            : "Darth Maul",
            attackPwr       : 20,
            currentAttackPwr: 20,
            baseAttack      : 15,
            cntrAttack      : 22,
            HP              : 185,
            currentHP       : 185,
            img             : "./assets/images/darth-maul.jpg",
        },
        {
            name            : "Boba Fett",
            attackPwr       : 17,
            currentAttackPwr: 17,
            baseAttack      : 14,
            cntrAttack      : 25,
            HP              : 200,
            currentHP       : 200,
            img             : "./assets/images/boba-fett.jpg",
        },
    ],

    attack  : function(auto){
        var attack = 0;
        var damage = 0;
        if(auto){
            //keep attacking untill one is defeted
            while(game.characters[game.userId].currentHP > 0 || game.characters[game.defenderId].currentHP > 0){
                game.characters[game.defenderId].currentHP -= game.characters[game.userId].currentAttackPwr;
                attack += game.characters[game.userId].currentAttackPwr;
                game.characters[game.userId].currentAttackPwr += game.characters[game.userId].baseAttack;

                if(game.characters[game.defenderId].currentHP > 0){
                    game.characters[game.userId].currentHP -= game.characters[game.defenderId].cntrAttack;
                    damage += game.characters[game.defenderId].cntrAttack;
                }else{
                    game.is_winner = true;
                    game.wins++;
                    break;
                }
                if(game.characters[game.userId].currentHP <= 0){
                    game.is_loser = true;
                    break;
                }
            }
        }else{
            // only perform one attack
            game.characters[game.defenderId].currentHP -= game.characters[game.userId].currentAttackPwr;
            attack += game.characters[game.userId].currentAttackPwr;
            game.characters[game.userId].currentAttackPwr += game.characters[game.userId].baseAttack;

            if(game.characters[game.defenderId].currentHP > 0){
                game.characters[game.userId].currentHP -= game.characters[game.defenderId].cntrAttack;
                damage += game.characters[game.defenderId].cntrAttack;
            }else{
                game.is_winner = true;
                game.wins++;
            }
            if(game.characters[game.userId].currentHP <= 0){
                game.is_loser = true;
            }
        }
        var info = "";
        info += "<b>You</b> attacked <b>Enemy</b> by "+ attack +" HP<br/>";
        info += "<b>Enemy</b> attacked <b>you</b> by "+ damage +"HP";
        $(".attack-info").html(info);
    },
    update_content: function(){
        switch(game.stage){
            case 1:
                $("#header").text("Select Your Character!");
                $("#content").empty();
                game.characters.forEach(function(item, index){
                    var $char = $("<div>");
                    $char.css('background-image', 'url(' + item.img + ')');
                    $char.attr("class", "image no-copy select");

                    $char.html("<br/><br/><br/><br/><br/><br/><br/><br/>"+item.name +" ("+ item.HP +" HP)");
                    $("#content").append($char);
                });
                break;
            case 2:
                $("#header").text("Select Your Enemy!");
                $("#content").empty();
                var $userChar = $("<div>");
                $userChar.css('background-image', 'url(' + game.characters[game.userId].img + ')');
                $userChar.attr("class", "image no-copy user-char");
                $userChar.html("<b>You</b><br/><br/><br/><br/><br/><br/><br/><br/>"+game.characters[game.userId].name +" ("+ game.characters[game.userId].currentHP +" HP)");

                $("#content").append($userChar);

                game.characters.forEach(function(item, index){
                    if(index !== game.userId && item.currentHP > 0){
                        var $char = $("<div>");
                        $char.css('background-image', 'url(' + item.img + ')');
                        $char.attr("class", "image no-copy select");

                        $char.html("<br/><br/><br/><br/><br/><br/><br/><br/>"+item.name +" ("+ item.HP +" HP)");
                        $("#content").append($char);
                    }
                });
                break;

            case 3:
                if($("#header").text()[0].toLowerCase() === "s"){
                    $("#header").text("Fight!");
                    $("#content").empty();
                    var $userChar = $("<div>");
                    $userChar.css('background-image', 'url(' + game.characters[game.userId].img + ')');
                    $userChar.attr("class", "image no-copy user-char");
                    $userChar.html("<b>You</b><br/><br/><br/><br/><br/><br/><br/><br/>"+game.characters[game.userId].name +" ("+ game.characters[game.userId].currentHP +" HP)");

                    var $vs = $("<div>");
                    $vs.attr("class", "vs no-copy");
                    $vs.text("VS");

                    var $atk_btn = $("<div>");
                    $atk_btn.attr("class", "attack-btn no-copy select");
                    $atk_btn.text("Attack");

                    var $auto_atk_btn = $("<div>");
                    $auto_atk_btn.attr("class", "auto-attack-btn no-copy select");
                    $auto_atk_btn.text("Auto Attack");

                    var $atk_info = $("<div>");
                    $atk_info.attr("class", "attack-info no-copy");
                    var info = "";
                    info += "<b>You</b>: ("+ game.characters[game.userId].currentHP +" HP)<br/>";
                    info += "<b>Enemy</b>: ("+ game.characters[game.defenderId].currentHP +" HP)";
                    $atk_info.html(info);

                    var $enemyChar = $("<div>");
                    $enemyChar.css('background-image', 'url(' + game.characters[game.defenderId].img + ')');
                    $enemyChar.attr("class", "image no-copy enemy-char");
                    $enemyChar.html("<b>Enemy</b><br/><br/><br/><br/><br/><br/><br/><br/>"+game.characters[game.defenderId].name +" ("+ game.characters[game.defenderId].currentHP +" HP)");


                    $("#content").append($userChar);
                    $("#content").append($vs);
                    $("#content").append($enemyChar);
                    $("#content").append($("<br>"));
                    $("#content").append($atk_btn);
                    $("#content").append($auto_atk_btn);
                    $("#content").append($("<br>"));
                    $("#content").append($atk_info);
                }else{
                    $(".user-char").html("<b>You</b><br/><br/><br/><br/><br/><br/><br/><br/>"+game.characters[game.userId].name +" ("+ game.characters[game.userId].currentHP +" HP)");
                    $(".enemy-char").html("<b>Enemy</b><br/><br/><br/><br/><br/><br/><br/><br/>"+game.characters[game.defenderId].name +" ("+ game.characters[game.defenderId].currentHP +" HP)");
                }
                break;

            case 4:
                if(game.is_winner){
                    if(game.wins < game.characters.length-1){
                        $("#header").text("You Just Won the Fight!");
                        var $continue = $("<div>");
                        $continue.attr("class", "continue no-copy select");
                        $continue.text("Next Fight!");

                        var $atk_info = $(".attack-info");
                        $(".attack-info").remove();
                        $(".attack-btn").remove();
                        $(".auto-attack-btn").remove();

                        $("#content").append($continue);
                        $("#content").append($("<br>"));
                        $("#content").append($atk_info);
                    }else{
                        $("#header").text("Gongratulations, You Won the Game!");
                    }
                }
                if(game.is_loser){
                    $("#header").text("Oops! Try Your Best..");
                }
                if(game.is_loser || game.wins === game.characters.length-1){
                    var $restart = $("<div>");
                    $restart.attr("class", "restart no-copy select");
                    $restart.text("Restart The Game");

                    var $atk_info = $(".attack-info");
                    $(".attack-info").remove();
                    $(".attack-btn").remove();
                    $(".auto-attack-btn").remove();

                    $("#content").append($restart);
                    $("#content").append($("<br>"));
                    $("#content").append($atk_info);
                }
                break;
        }
    },
    initialize  : function(){
        game.cmd_name   = "";
        game.is_loser   = false;
        game.is_winner  = false;
        game.wins       = 0;
        game.stage      = 0;
        game.userId     = -1;
        game.defenderId = -1;
        game.characters.forEach(function(item, index){
            item.currentAttackPwr = item.attackPwr;
            item.currentHP = item.HP;
        });
    },
    run         : function(){
        switch(game.stage){
            case 0://the starting point of the game
                game.stage++;
                game.update_content(); //present_all_characters and clear_everything
                break;

            case 1://waiting for user to choose an attcker character
                for(var i=0; i< game.characters.length; i++){
                    if(game.characters[i].name[1] === game.cmd_name[1]){
                        game.userId = i;
                        game.stage++;
                        break;
                    }
                }
                game.update_content();
                break;

            case 2://waiting for user to choose a defender character
                for(var i=0; i< game.characters.length; i++){
                    if(game.characters[i].name[1] === game.cmd_name[1]){
                        game.defenderId = i;
                        game.stage++;
                        break;
                    }
                }
                game.update_content();
                break;

            case 3:// both are in their Battle
                if(game.cmd_name[1] === "u" || game.cmd_name[1] === "t"){//"auto attack" or "attack"
                    game.attack(game.cmd_name[1] === "u");
                    game.update_content();
                    if(game.is_winner || game.is_loser){
                        game.stage++;
                        game.update_content();
                    }
                }
                break;
            case 4://the defender or the attacker has been defeated
                if(game.cmd_name[2] === "s"){//Restart The Game
                    game.initialize();
                    game.stage++;
                    game.update_content();
                }
                if(game.cmd_name[2] === "x" && game.is_winner){//Next Fight!
                    game.stage = 2;
                    game.is_winner = false;
                    game.update_content();
                }
                break;
        }
        game.cmd_name = "";

    }
}

$(document).on("click", ".select" ,function(){
    game.cmd_name = $(this).text();
    console.log(game.cmd_name);
    game.run();
});
game.run();