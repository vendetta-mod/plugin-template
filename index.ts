import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
import Settings from "./settings";
import { storage } from '@vendetta/plugin';
const MessageActions = findByProps("sendMessage", "receiveMessage")
import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;
const meuid = findByProps("getCurrentUser").getCurrentUser().id



function constructMessage(message, channel) {
    let msg = {
        id: '',
        type: 0,
        content: '',
        channel_id: channel.id,
        author: {
            id: '',
            username: '',
            avatar: '',
            discriminator: '',
            publicFlags: 0,
            avatarDecoration: null,
        },
        attachments: [],
        embeds: [],
        mentions: [],
        mention_roles: [],
        pinned: false,
        mention_everyone: false,
        tts: false,
        timestamp: '',
        edited_timestamp: null,
        flags: 0,
        components: [],
    };

    if (typeof message === 'string') msg.content = message;
    else msg = { ...msg, ...message };

    return msg;
};

let patches = []



const delayedStart = () => {
    try {
patches.push(before("actionHandler", FD.MESSAGE_CREATE?.find(i => i.name === "MessageStore"), (args: any) => {
let message = args[0].message;
let guildId = args[0].guildId;
let channelId = args[0].channelId;
if(message.content.includes("<@" + meuid + ">") && storage.modafk && message.author.id != meuid && !message.content.includes("[mensagem automática]")) {
MessageActions.sendMessage(channelId, {
                content: "<@" + message.author.id + "> " + storage.afk + "\n[mensagem automática]"
            });

}
              return  
            }));

return null;
    } catch (err) {}
    }

export const settings = Settings;

export const onLoad = () => {

FluxDispatcher.dispatch({
            type: "MESSAGE_CREATE",
            message: constructMessage('PLACEHOLDER', { id: '0' }),
        });
        
    storage.modafk ??= false
    storage.afk ??= "oi"
    setTimeout(() => delayedStart(), 300);
}

export const onUnload = () => {
    for (const unregisterCommands of patches) unregisterCommands()
}
