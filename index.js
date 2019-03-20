/*
Bienvenue sur le fichier principal de votre bot. Ceci est un peu la matrice du bot.
Vous trouverez ci-dessous toute les explications concernant chaque fonction du bot
et comment les modifier correctement.
*/

const Discord = require("discord.js"); //Ayant besoin du module discord.js pour faire tourner le bot sous Discord nous l'appelons. Vous devrez l'installer en faisant npm i discord.js dans une invite de commande (cmd).
const client = new Discord.Client(); //Voici le client. Il est souvent nommé "bot" dans les bots que vous pouvez télécharger sur github mais je préfère mettre client pour que cela soit plus compréhensible.
const moment = require("moment");

const config = require('./config.json');
/*Ayant besoin d'un fichier contenant les informations sensibles du bot comme le token ou l'ID de l'owner, 
nous faisons appelle à ce dernier pour bénéficier de ce contenu sans le mettre de façon lisible dans le code du bot.
Cela évite que nous ayons des informations privées et/ou sensibles qui se retrouvent dans le code du bot et que quelqu'un de mal intentionné vous vol votre bot (rigolez pas, ça arrive régulièrement ce genre de problème)*/

client.login(config.token) //Nous faisons appelle au token du bot.

//Ci-dessous nous créeons une constante qui se lance au démmarage du bot (d'où le client.on) Elle execute un démarrage avec affichage d'informations dans la console ainsi que sur Discord.
client.on("ready", function() {
    console.clear();
    var clientcharge = `
------------------------------------------------------
> Lancement en cours...
------------------------------------------------------
${client.user.tag} s'est correctement lancé !
Il est actuellement connecté sur ${client.guilds.size} serveur(s)
ainsi que ${client.channels.size} canaux
Il y a ${client.users.size} utilisateurs 
qui peuvent potentiellement utiliser le bot !
LET'S GO!
------------------------------------------------------
---------- Bot de Test créé par AeRogue --------------
------------------------------------------------------
----------------- Logs du Bot ------------------------`

    console.log(clientcharge); //Nous faisons appelle à la variable clientcharge que nous avons créé ci-dessus. Le texte qu'elle contient s'affichera dans la console.
	
    //Ici nous définissons une boucle infinie de "jeux" qui défileront sous le pseudo du bot. Par exemple : Joue à mettre des vents (c'est gratuit)
    let statusArray = [
        `${config.prefix}help | Surveille ${client.guilds.size} serveurs !`, //Vous pouvez changer les jeux ! :D
		`${config.prefix}help | ${client.user.username} version ${config.version} !`,
        `${config.prefix}help | Possède ${client.users.size} membres !`,
	
	];
	
	setInterval(function() {
	client.user.setPresence({
        game: { 
            name: `${statusArray[~~(Math.random() * statusArray.length)]}`, //Nous appelons statusArray et executons de façon aléatoire un des jeux proposés ci-dessus.
			url:"https://twitch.tv/alphaleadershipaa", //Ceci permet d'afficher le bot avec une bannière façon Twitch sur Discord. Vous pouvez tout à fait le supprimer mais il faut penser à éditer aussi ci-dessous.
            type: 'STREAMING' //Ici nous déclarons que le bot est en mode stream. Il affichera donc qu'il est en plein stream ce qui permet l'affichage d'un décor violet comme sur Twitch derrière le bot. Vous pouvez remplacer STREAMING par WATCHING, cela affichera Joue à.
        },
        status: 'online' //Ceci définit le status du bot. Online (En ligne) , idle (AFK) , offline (Hors-Ligne) ou dnd (Ne pas déranger). 
    })
	 }, 3000); //Ceci est un timer qui permet de changer de jeu à interval régulier. Ici il est réglé sur 3 secondes.
});

client.on("message", async message => {

 var args = message.content.substring(config.prefix.length).split(" ");

switch (args[0]) {
case "help":
case "?":
client.users.get(config.OwnerID).send(`${message.author.tag} a utilisé ${config.prefix}help !`);
    
    message.reply("Veuillez repondre a vos messages privés :inbox_tray:");

    message.author.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: `Commandes de ${config.BotName}`,
        fields: [{         name: "Aide du Bot",
            value: `**${config.prefix}help [?]** - Permet d'afficher cette information 
**${config.prefix}botinfo [bi]** - Permet d'afficher des informations sur le bot
**${config.prefix}invite** - Permet d'inviter le bot
**${config.prefix}embed <un text>** - permet de metre le texte selectionner dans un embed simple
**${config.prefix}serverinfo [si]** - permet d'afficher des inphormations sur le serveur
**${config.prefix}say <un message>** - permet de dire au bot d'envoyer le message selectionner
**${config.prefix}master** - te dit si tu est le maitre du bot ou pas`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: `© ${config.BotName}`
        }
      }
    });
        break;
case"botinfo":
case"bi":
client.users.get(config.OwnerID).send(` ${message.author.tag} viens d'utiliser ${config.prefix}botinfo !`);

		
        message.channel.send({embed: {
            color: 3447003,
            title: "Informations sur le bot de test",
            description: "Voici les informations sur le bot de test",
            fields: [{
                name: "Créateur :",
                value: `${config.OwnerName}`
              },
              {
                name: `__Invitation officielle pour rejoindre le labo de dev de ${config.BotName} :__ 》`,
                value: "https://discordapp.com/invite/JCdt7EZ"
              },
              {
                name: `Pour inviter ${config.BotName} :`,
                value: "[:robot:](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=" + config.nivperms + ") :arrow_left:  Clique sur le robot"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: `© ${config.BotName}`
            }
          }
        });
break;
case "invite":
case "inv":
client.users.get(config.OwnerID).send(` ${message.author.tag} a utilisé ${config.prefix}invite !`);
message.reply("Tu souhaite inviter mon bot sur ton Discord ? Pas de problème ! Clique sur le lien --> https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=" + config.nivperms);
break;
case"listserv":
client.users.get(config.OwnerID).send(`${message.author.tag} a utilisé ${config.prefix}listserv`);
message.delete();
if (message.author.id == config.OwnerID) {
message.channel.send(client.guilds.map(r => r.name + `( **${r.memberCount}** membre(s))\n ID : ` + r.id + `\n Gérant(e) : ` + r.owner.user.username + `\n `))
		} else {
message.channel.send(client.guilds.map(r => r.name + `( **${r.memberCount}** membre(s))`))
		}
break;
/*
ATTENTION ! Veuillez à ne pas oublier que si vous laissez message.delete(); vous devez vérifier que le bot peut supprimer les messages (Il doit posséder la permission Gérer les messages).
Si vous l'avez mis sur la permission 8 donc Administrateur il n'y a rien à vérifier.
*/
case "si":
case "serverinfo":
client.users.get(config.OwnerID).send(`${message.author.tag} a utilisé ${config.prefix}serverinfo / si !`);

let guildmessageServerInfo = message.guild;
let nameServerInfo = message.guild.name;
let createdAtServerInfo = moment(message.guild.createdAt).format(' DD/MM/YYYY à hh:mm:ss ');
let channelsServerInfo = message.guild.channels.size;
let ownerServerInfo = message.guild.owner.user.tag;
let memberCountServerInfo = message.guild.memberCount;
let largeServerInfo = message.guild.large;
let iconUrlServerInfo = message.guild.iconURL;
let regionServerInfo = message.guild.region;
let afkServerInfo = message.guild.channels.get(message.guild.afkChannelID) === undefined ? 'Non' : message.guild.channels.get(guildmessageServerInfo.afkChannelID).name;

			message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: message.guild.name,
                  icon_url: message.guild.iconURL
                },
                title: "Informations serveur",
                fields: [{
                    name: "Canaux",
                    value: `**Nombre de canaux : ** ${channelsServerInfo}\n** Canal AFK : ** ${afkServerInfo}`
                  },
                  {
                    name: "Membres",
                    value: `**Nombre de Membres : ** ${memberCountServerInfo}\n** Gérant : ** ${ownerServerInfo}\n** ID du Gérant: ** ${message.guild.owner.id}`
                  },
                  {
                    name: "Autre",
                    value: `**Créer le : ** ${createdAtServerInfo}\n**Region: ** ${regionServerInfo}\n**ID du serveur: ** ${message.guild.id}`
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `© ${config.BotName}`
                }
              }
            });
break;
case"userinfo":
case"ui":
client.users.get(config.OwnerID).send(` ${message.author.tag} a utilisé ${config.prefix}userinfo !`);
		let user = message.mentions.users.first();
        if (!user) {
            return message.reply('Veuillez renseigner un pseudonyme !');
        }
        const utilisateurrecherché = message.mentions.users.first();
        const arejoinslediscord = (utilisateurrecherché.createdAt.getDate() + 1) + '/' + (utilisateurrecherché.createdAt.getMonth() + 1) + '/' + utilisateurrecherché.createdAt.getFullYear() + ' à ' + utilisateurrecherché.createdAt.getHours() + ' heures ' + utilisateurrecherché.createdAt.getMinutes() + ' minutes et ' + utilisateurrecherché.createdAt.getSeconds() + ' secondes';
		
		let game;
        if (user.presence.game === null) {
            game = 'Activité non définie.';
        } else {
            game = user.presence.game.name;
        }
        let messag;
        if (user.lastMessage === null) {
            messag = "N'a pas envoyé de message.";
        } else {
            messag = user.lastMessage;
        }
        let status;
        if (user.presence.status === 'online') {
            status = '**Connecté - En Ligne** :white_check_mark: ';
        } else if (user.presence.status === 'dnd') {
            status = '**Connecté - Ne pas Déranger !** :no_bell: ';
        } else if (user.presence.status === 'idle') {
            status = '**Connecté - AFK** :alarm_clock: ';
        } else if (user.presence.status === 'offline') {
            status = '**Déconnecté** :end: ';
        }
        let stat;
        if (user.presence.status === 'offline') {
            stat = 0x000000;
        } else if (user.presence.status === 'online') {
            stat = 0x00AA4C;
        } else if (user.presence.status === 'dnd') {
            stat = 0x9C0000;
        } else if (user.presence.status === 'idle') {
            stat = 0xF7C035;
        }
		let antibot;
		if (user.bot === false) {
			antibot = 'Non';
		}
		if (user.bot === true) {
			antibot = 'Oui';
		}
			
		
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: `Informations sur ${user.username}`,
          icon_url: user.displayAvatarURL
        },
        fields: [{
            name: 'Pseudonyme',
            value: `${user.username} ( ${user.tag} )`
          },
		  {
			  name: "Discriminateur/Tag",
			  value: `${user.discriminator}`
		  },
		  {
			  name: "ID",
			  value: `${user.id}`
		  },
		  {
			  name: 'Date de création du compte',
			  value: `${arejoinslediscord}`
		  },
		  {
			  name: "Dernier message envoyé",
			  value: `${messag}`
		  },
		  {
			  name: "Jeu actuel",
			  value: `${game}`
		  },
		  {
			  name: "Status utilisateur",
			  value: `${status}`
		  },
		  {
			  name: "Cet utilisateur est-il un bot ?",
			  value: `${antibot}`
		  },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: user.displayAvatarURL,
          text: `© ${config.BotName}`
        }
      }
    });
break;
case'exit':
if(msg.author.id == config.OwnerID){
  client.users.get(config.OwnerID).send(msg.author.username + ' a utiliser le ' + prefix + 'exit')
  setInterval(function(){
      client.destroy().then(process.exit());
  },5000);
}else{
  msg.channel.send ("Tu n'a pas le droit de m'éteindre.");
};
break;

client.on("error", (err) => {});

 }
});

client.on('message', (msg) => {

  if(msg.author.bot) return;
  var msgarray = msg.content.split(' ');
  var cmd = msgarray[0];
  var args = msgarray.slice(1);
  var prefix = config.prefix;

  if (cmd == prefix + "embed"){
    let embed = new Discord.RichEmbed()
        .setTitle(args.join(' '))
        .setColor(msg.guild.members.get(msg.author.id).displayHexColor);
    msg.channel.send(embed).then(message => {
      if(embed.title == '') {
        message.delete();
        msg.reply('merci de me donner un texte')
      };
      if (msg.deletable) return msg.delete();
      return
    });    
    return msg.delete
  };


  if (cmd == prefix + "master"){
    if(msg.author.id == config.OwnerID || msg.author.id == '460904946838274098'){
        msg.channel.send("Tu est mon maitre.");
    }else{
        msg.channel.send("Tu n'est pas mon maitre.");
    };
  };

  if (cmd == prefix + 'ban'){
    let banuser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if (msg.member.hasPermission('BAN_MEMBERS')){
        if(banuser.bannable){
            banuser.ban({"reason" : args.join(' ')});
        }else{
            msg.channel.send('je ne peut pas banir cet utilisateur');
        };
    }else{
        msg.channel.Send("tu n'a pas la permition de banir un utilisateur");
    };
    return;
  };

  if (cmd == prefix + 'kick'){
    let kickuser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]))
    if (msg.member.hasPermission('KICK_MEMBERS')){
          kickuser.kick()
    }else{
        msg.channel.Send("tu n'a pas la permition de kick un utilisateur")
    };
    return;
};
})


