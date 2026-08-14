#!/usr/bin/env node
import{randomUUID as Ut}from"node:crypto";import{Server as Vt}from"@modelcontextprotocol/sdk/server/index.js";import{StdioServerTransport as qt}from"@modelcontextprotocol/sdk/server/stdio.js";import{CallToolRequestSchema as zt,ListToolsRequestSchema as $t}from"@modelcontextprotocol/sdk/types.js";import{readFileSync as Je}from"node:fs";import{fileURLToPath as Xe}from"node:url";function Ke(){return"0.1.0"}var O=Ke();var C=["get_document_info","get_selection","get_design_context","get_node","get_nodes","search_nodes","scan_text_nodes","scan_nodes_by_types","get_styles","get_variables","get_components","get_component","get_library_component","get_design_system_kit","generate_design_md","design_fingerprint","screenshot","export_node","get_fonts","export_tokens","layout_audit","audit_design_system","read_selection"],de=["create","modify","delete","clone","move","resize","group","ungroup","flatten","batch","find_component","find_or_create_component","instantiate","create_variants","arrange_component_set","set_component_description","add_component_property","componentize","setup_tokens","setup_text_styles","setup_effect_styles","set_text_style","apply_variable","create_variable","update_variable","rename_variable","delete_variable","import_tokens","set_text","load_icon","load_image","create_page","set_current_page","create_overlay","set_selection","zoom_to_fit","get_instance_overrides","set_instance_overrides","detach_instance","reset_instance_overrides","set_selection_colors","set_gradient","set_effects","set_reactions","apply_design_system"],Z=[...C,...de],U=["list_channels"];var ue=1e4,V=3e4,pe=3e4,he={screenshot:9e4,export_node:9e4,get_design_context:6e4,get_components:6e4,get_component:6e4,get_library_component:6e4,get_design_system_kit:6e4,generate_design_md:6e4,design_fingerprint:3e4,batch:3e4,delete_variable:6e4,export_tokens:6e4,import_tokens:6e4},P=20,q=12e4,ge="leader.json";var g=class extends Error{code;hint;constructor(t,e,r){super(e),this.name="OpError",this.code=t,this.hint=r}toBridgeError(){return{code:this.code,message:this.message,...this.hint?{hint:this.hint}:{}}}};function A(n,t="INTERNAL",e){return n instanceof g?n.toBridgeError():n instanceof Error?{code:t,message:n.message,...e?{hint:e}:{}}:{code:t,message:String(n),...e?{hint:e}:{}}}import{z as i}from"zod";var Qe=new Set([...Z,...U]),w=i.string().trim().min(1,"nodeId must be a non-empty string"),L=i.record(i.unknown()),me=i.object({detail:i.enum(["sparse","compact","full","design"]).optional(),depth:i.number().int().min(0).max(8).optional(),screenDepth:i.number().int().min(0).max(8).optional(),includeJson:i.boolean().optional(),includeAnatomy:i.boolean().optional(),includeInstances:i.boolean().optional(),includeScreens:i.boolean().optional(),includeComponentUsage:i.boolean().optional(),maxComponents:i.number().int().min(0).optional(),maxScreens:i.number().int().min(0).max(500).optional(),maxInstances:i.number().int().min(0).max(2e4).optional(),maxVariantsPerComponent:i.number().int().min(0).optional(),maxTextLayersPerComponent:i.number().int().min(0).optional(),maxOutputChars:i.number().int().positive().optional()}).passthrough(),ye={get_node:!0,modify:!0,delete:!0,clone:!0,move:!0,resize:!0,ungroup:!0,flatten:!0,apply_variable:!0,set_text:!0,zoom_to_fit:!0,layout_audit:!0,audit_design_system:!0,export_node:!0,set_gradient:!0,set_effects:!0,set_reactions:!0,set_text_style:!0,apply_design_system:!0,add_component_property:!0},fe={get_node:i.object({nodeId:w}).passthrough(),get_nodes:i.object({nodeIds:i.array(w).min(1)}).passthrough(),modify:i.object({nodeId:w,props:i.record(i.unknown()).optional()}).passthrough(),delete:i.object({nodeId:w}).passthrough(),clone:i.object({nodeId:w}).passthrough(),move:i.object({nodeId:w}).passthrough(),resize:i.object({nodeId:w}).passthrough(),ungroup:i.object({nodeId:w}).passthrough(),flatten:i.object({nodeId:w}).passthrough(),export_tokens:i.object({format:i.enum(["dtcg","css","tailwind"]).optional(),collection:i.string().trim().min(1).optional(),mode:i.string().trim().min(1).optional(),allModes:i.boolean().optional(),selector:i.string().trim().min(1).optional()}).passthrough(),import_tokens:i.object({tokens:i.record(i.unknown()).optional(),dtcg:i.record(i.unknown()).optional(),modes:i.record(i.unknown()).optional(),collection:i.string().trim().min(1).optional(),mode:i.string().trim().min(1).optional()}).passthrough().refine(n=>n.tokens||n.dtcg||n.modes,{message:"import_tokens requires tokens (DTCG tree) or modes ({modeName: tree})."}),create_variable:i.object({name:i.string().trim().min(1),type:i.enum(["COLOR","FLOAT","STRING","BOOLEAN"]).optional(),value:i.unknown().optional(),valuesByMode:i.record(i.unknown()).optional(),collection:i.string().trim().min(1).optional(),description:i.string().optional()}).passthrough().refine(n=>n.value!==void 0||n.valuesByMode!==void 0,{message:"create_variable requires value or valuesByMode."}),update_variable:i.object({variable:i.string().trim().min(1).optional(),name:i.string().trim().min(1).optional(),variableId:i.string().trim().min(1).optional()}).passthrough().refine(n=>n.variable||n.name||n.variableId,{message:"update_variable requires variable (name or id)."}),rename_variable:i.object({variable:i.string().trim().min(1).optional(),name:i.string().trim().min(1).optional(),variableId:i.string().trim().min(1).optional(),newName:i.string().trim().min(1)}).passthrough().refine(n=>n.variable||n.name||n.variableId,{message:"rename_variable requires variable (name or id)."}),delete_variable:i.object({variable:i.string().trim().min(1).optional(),name:i.string().trim().min(1).optional(),variableId:i.string().trim().min(1).optional(),replaceWith:i.string().trim().min(1).optional(),force:i.boolean().optional()}).passthrough().refine(n=>n.variable||n.name||n.variableId,{message:"delete_variable requires variable (name or id)."}),componentize:i.object({nodeId:w,name:i.string().trim().min(1).optional(),replaceCopies:i.boolean().optional(),scope:i.enum(["page","document"]).optional()}).passthrough(),set_component_description:i.object({nodeId:w,description:i.string().optional(),documentationLinks:i.array(i.object({uri:i.string().trim().min(1)}).passthrough()).optional()}).passthrough().refine(n=>n.description!==void 0||n.documentationLinks!==void 0,{message:"set_component_description requires description and/or documentationLinks."}),add_component_property:i.object({nodeId:w,name:i.string().trim().min(1),type:i.string().trim().min(1),defaultValue:i.union([i.string(),i.boolean()]).optional(),layerId:i.string().trim().min(1).optional()}).passthrough(),arrange_component_set:i.object({nodeId:w,gap:i.number().min(0).optional(),padding:i.number().min(0).optional(),columnsBy:i.string().trim().min(1).optional()}).passthrough(),create_variants:i.object({baseSpec:i.record(i.unknown()).optional(),name:i.string().trim().min(1).optional(),axes:i.record(i.array(i.union([i.string(),i.number(),i.boolean()])).min(1,"each axis needs at least one value")).optional()}).passthrough().refine(n=>n.axes!==void 0||n.variants!==void 0||n.states!==void 0,{message:"create_variants requires axes or variants/states."}),find_or_create_component:i.object({name:i.string().trim().min(1).optional(),query:i.string().trim().min(1).optional(),spec:i.record(i.unknown()).optional(),dryRun:i.boolean().optional(),threshold:i.number().positive().optional()}).passthrough().refine(n=>n.name||n.query,{message:"find_or_create_component requires name or query."}),instantiate:i.object({componentId:i.string().trim().min(1).optional(),component:i.string().trim().min(1).optional(),query:i.string().trim().min(1).optional()}).passthrough().refine(n=>n.componentId||n.component||n.query,{message:"instantiate requires one of: componentId, component, query."}),apply_variable:i.object({nodeId:w,field:i.string().trim().min(1),tokenName:i.string().trim().min(1)}).passthrough(),set_text:i.object({nodeId:w}).passthrough().refine(n=>typeof n.content=="string"||typeof n.characters=="string"||typeof n.text=="string",{message:"set_text requires one of: content, characters, text (string)."}),zoom_to_fit:i.object({nodeId:w}).passthrough(),layout_audit:i.object({nodeId:w}).passthrough(),audit_design_system:i.object({nodeId:w}).passthrough(),export_node:i.object({nodeId:w}).passthrough(),create:i.object({type:i.string().trim().min(1).optional()}).passthrough(),group:i.object({nodeIds:i.array(w).min(1)}).passthrough(),create_page:i.object({name:i.string().trim().min(1)}).passthrough(),set_current_page:i.object({pageId:w.optional(),name:i.string().trim().min(1).optional()}).passthrough().refine(n=>n.pageId||n.name,{message:"set_current_page requires pageId or name."}),load_icon:i.object({name:i.string().trim().min(1)}).passthrough(),load_image:i.object({}).passthrough(),batch:i.object({ops:i.array(i.object({op:i.string(),params:i.record(i.unknown())})).min(1)}).passthrough(),screenshot:L,get_components:L,get_component:i.object({componentId:w.optional(),nodeId:w.optional(),id:w.optional(),key:i.string().trim().min(1).optional()}).passthrough().refine(n=>n.componentId||n.nodeId||n.id||n.key,{message:"get_component requires componentId, nodeId, id, or key."}),get_library_component:i.object({key:i.string().trim().min(1,"key must be a non-empty string"),type:i.enum(["component","set","auto"]).optional()}).passthrough(),get_design_system_kit:me,generate_design_md:me,design_fingerprint:L,get_instance_overrides:i.object({nodeId:w.optional()}).passthrough(),set_instance_overrides:i.object({sourceId:i.string().trim().min(1,"sourceId must be a non-empty string"),targetIds:i.array(w).min(1,"targetIds must list at least one target instance")}).passthrough(),detach_instance:i.object({nodeId:w.optional(),nodeIds:i.array(w).min(1).optional()}).passthrough().refine(n=>n.nodeId||n.nodeIds,{message:"detach_instance requires nodeId or nodeIds."}),reset_instance_overrides:i.object({nodeId:w.optional(),nodeIds:i.array(w).min(1).optional()}).passthrough().refine(n=>n.nodeId||n.nodeIds,{message:"reset_instance_overrides requires nodeId or nodeIds."}),set_selection_colors:i.object({nodeId:w.optional(),from:i.string().trim().min(1).optional(),to:i.string().trim().min(1,"to (target color) is required"),includeStrokes:i.boolean().optional()}).passthrough(),set_gradient:i.object({nodeId:w,type:i.enum(["LINEAR","RADIAL","ANGULAR","DIAMOND"]),stops:i.array(i.object({position:i.number(),color:i.string().trim().min(1)})).min(2,"a gradient needs at least 2 stops"),transform:i.unknown().optional(),target:i.string().trim().min(1).optional()}).passthrough(),set_effects:i.object({nodeId:w,effects:i.array(i.object({type:i.string().trim().min(1),radius:i.number().optional()}).passthrough())}).passthrough(),setup_text_styles:i.object({styles:i.array(i.object({name:i.string().trim().min(1)}).passthrough()).min(1,"setup_text_styles needs at least one style")}).passthrough(),setup_effect_styles:i.object({styles:i.array(i.object({name:i.string().trim().min(1),effects:i.array(i.unknown()).min(1)}).passthrough()).min(1,"setup_effect_styles needs at least one style")}).passthrough(),set_text_style:i.object({nodeId:w}).passthrough(),apply_design_system:i.object({nodeId:w,dryRun:i.boolean().optional()}).passthrough(),set_reactions:i.object({nodeId:w,reactions:i.array(i.object({}).passthrough())}).passthrough(),read_selection:L};function E(n,t){if(!Qe.has(n))throw new g("UNSUPPORTED_OPERATION",`Unknown operation "${n}".`,`Valid operations: ${[...Z,...U].join(", ")}.`);let e=n,r=L.safeParse(t??{});if(!r.success)throw new g("INVALID_PARAMS",`params for "${n}" must be an object.`,'Pass params as a JSON object, e.g. { nodeId: "12:3" }.');if(ye[e]&&!fe[e]){let s=r.data.nodeId;if(typeof s!="string"||s.trim().length===0)throw new g("INVALID_PARAMS",`Operation "${n}" requires a non-empty "nodeId".`,"Provide the target node id, e.g. from get_selection or a create() result.")}let o=fe[e];if(o){let s=o.safeParse(r.data);if(!s.success){let u=s.error.issues[0],a=u?.path.join(".")||"(root)";throw new g("INVALID_PARAMS",`Invalid params for "${n}": ${u?.message??"validation failed"} at ${a}.`,Ze(e))}return{op:e,params:s.data}}return{op:e,params:r.data}}function Ze(n){return ye[n]?"Check the nodeId is a non-empty string returned by a read or create op.":n==="batch"?"batch expects { ops: [{ op, params }, ...] }.":'See figma_docs(section="api") for the exact parameter shape.'}function Y(n){return C.includes(n)||U.includes(n)}var we="default",z=class{sessions=new Map;get(t){let e=t&&t.length>0?t:we,r=this.sessions.get(e);return r||(r={id:e,state:{},createdAt:Date.now(),lastUsedAt:Date.now(),writeCount:0},this.sessions.set(e,r)),r.lastUsedAt=Date.now(),r}has(t){return this.sessions.has(t)}reset(t){let e=t&&t.length>0?t:we;this.sessions.delete(e)}summaries(){let t=Date.now();return[...this.sessions.values()].map(e=>({id:e.id,writeCount:e.writeCount,stateKeys:Object.keys(e.state).length,lastUsedMs:t-e.lastUsedAt}))}};import{mkdir as ct,writeFile as lt,readFile as dt,rename as ut,rm as Ie}from"node:fs/promises";import{randomBytes as pt}from"node:crypto";import{createServer as Ye}from"node:http";import{randomUUID as be,randomInt as ee}from"node:crypto";import{WebSocketServer as et,WebSocket as te}from"ws";var $=100,tt=1,_e=["brave","calm","eager","fancy","gentle","happy","jolly","kind","lively","merry","noble","proud","quick","sunny","swift","witty"],ve=["otter","falcon","panda","tiger","whale","fox","lynx","koala","heron","bison","gecko","dolphin","badger","crane","maple","cedar"],ne=class{constructor(t,e,r){this.channel=t;this.ws=e;this.info=r}channel;ws;info;pending=new Map;queue=[];inFlight=0;lastHeartbeatAt=Date.now();get open(){return this.ws.readyState===te.OPEN}get lastHeartbeatMs(){return Date.now()-this.lastHeartbeatAt}enqueue(t,e){if(this.queue.length>=$){e.reject(new g("QUEUE_FULL",`Request queue for channel "${this.channel}" is full (${this.queue.length}/${$}) \u2014 plugin is busy (${this.inFlight} in flight).`,"Wait for in-flight operations to finish, or batch related ops into one figma_write."));return}this.pending.set(e.id,e),this.queue.push({request:t,pending:e}),this.drainQueue()}drainQueue(){if(this.open)for(;this.queue.length>0&&this.inFlight<tt;){let t=this.queue.shift();if(!t)break;this.pending.has(t.pending.id)&&(this.inFlight++,t.pending.timer=this.armTimer(t.pending.id,t.pending.op,t.pending.timeoutMs),this.send({type:"request",payload:t.request}))}}onResponse(t){let e=this.pending.get(t.id);if(e){if(t.progress&&t.error===void 0&&!rt(t)){e.onProgress?.(t.progress),this.resetTimer(e);return}t.progress&&e.onProgress?.(t.progress),this.settle(t.id),e.resolve(t)}}armTimer(t,e,r){let o=setTimeout(()=>{let s=this.pending.get(t);s&&(this.settle(t),s.reject(new g("PLUGIN_TIMEOUT",`Operation "${e}" timed out after ${r}ms.`,"The Figma plugin did not respond in time \u2014 check figma_status; the window may be minimized or the op may be very large.")))},r);return o.unref?.(),o}resetTimer(t){clearTimeout(t.timer),t.timer=this.armTimer(t.id,t.op,t.timeoutMs)}settle(t){let e=this.pending.get(t);e&&(clearTimeout(e.timer),this.pending.delete(t),this.inFlight>0&&this.inFlight--,this.drainQueue())}failAllPending(t){let e=[...this.pending.values()];this.pending.clear(),this.queue.length=0,this.inFlight=0;for(let r of e)clearTimeout(r.timer),r.reject(t)}send(t){this.ws.readyState===te.OPEN&&this.ws.send(JSON.stringify(t))}summary(){return{channel:this.channel,plugin:this.info,queueLength:this.queue.length,pendingCount:this.pending.size,lastHeartbeatMs:this.lastHeartbeatMs}}},W=class{constructor(t={}){this.handlers=t}handlers;http;wss;channels=new Map;bySocket=new Map;stagedSockets=new Set;unrouted=[];sessionBindings=new Map;sessionsProvider;boundPort=0;authToken="";heartbeatTimer;setSessionsProvider(t){this.sessionsProvider=t}sessionBinding(t){return this.sessionBindings.get(t)?.channel}get port(){return this.boundPort}get pluginConnected(){for(let t of this.channels.values())if(t.open)return!0;return!1}get plugin(){return this.channels.size!==1?void 0:this.channels.values().next().value?.info}get lastHeartbeatMs(){let t=-1;for(let e of this.channels.values()){let r=e.lastHeartbeatMs;(t===-1||r<t)&&(t=r)}return t}get queueLength(){let t=this.unrouted.length;for(let e of this.channels.values())t+=e.queue.length;return t}get pendingCount(){let t=this.unrouted.length;for(let e of this.channels.values())t+=e.pending.size;return t}get channelCount(){return this.channels.size}channelSummaries(){return[...this.channels.values()].map(t=>t.summary())}async listen(t,e){return this.authToken=e,await this.tryListen(t),this.boundPort=t,this.startHeartbeatMonitor(),t}tryListen(t){return new Promise((e,r)=>{let o=Ye((c,l)=>this.handleHttp(c,l)),s=new et({noServer:!0});o.on("upgrade",(c,l,p)=>{if(new URL(c.url??"/","http://localhost").pathname!=="/ws"){l.destroy();return}s.handleUpgrade(c,l,p,_=>this.onWsConnection(_))});let u=c=>{o.removeListener("listening",a),r(c)},a=()=>{o.removeListener("error",u),this.http=o,this.wss=s,e()};o.once("error",u),o.once("listening",a),o.listen(t,"127.0.0.1")})}onWsConnection(t){this.stagedSockets.add(t),t.on("message",e=>this.onWsMessage(t,e)),t.on("close",()=>this.onWsClose(t)),t.on("error",()=>{})}onWsMessage(t,e){let r;try{r=JSON.parse(e.toString())}catch{return}let o=this.bySocket.get(t);switch(r.type){case"hello":{this.acceptHello(t,r);break}case"ping":{if(!o)break;o.lastHeartbeatAt=Date.now(),o.send({type:"pong",at:Date.now()});break}case"pong":{if(!o)break;o.lastHeartbeatAt=Date.now();break}case"response":{if(!o)break;o.onResponse(r.payload);break}case"bind":{if(!o||typeof r.sessionId!="string"||r.sessionId.length===0)break;this.sessionBindings.set(r.sessionId,{channel:o.channel,notified:!1}),this.broadcastChannels();break}default:break}}broadcastChannels(){let t=[...this.channels.values()].map(r=>({channel:r.channel,fileName:r.info.fileName,pageName:r.info.pageName})),e=(this.sessionsProvider?.()??[]).map(r=>({...r,boundChannel:this.sessionBindings.get(r.id)?.channel??null}));for(let r of this.channels.values())r.send({type:"channels",self:r.channel,channels:t,sessions:e})}acceptHello(t,e){let r=this.bySocket.get(t);if(r){r.info={...r.info,version:e.pluginVersion,protocolVersion:e.protocolVersion,fileKey:e.fileKey,fileName:e.fileName,pageName:e.pageName,editorType:e.editorType},r.lastHeartbeatAt=Date.now();return}if(!this.stagedSockets.has(t))return;this.stagedSockets.delete(t);let s=nt(e.channel)||this.generateChannel(),u={version:e.pluginVersion,protocolVersion:e.protocolVersion,fileKey:e.fileKey,fileName:e.fileName,pageName:e.pageName,editorType:e.editorType,connectedAt:Date.now()},a=this.channels.get(s);if(a&&(a.failAllPending(new g("NOT_CONNECTED",`Plugin connection on channel "${s}" was replaced by a new Figma window.`,"Retry the operation; the new plugin connection is now active.")),this.bySocket.delete(a.ws),a.ws!==t))try{a.ws.close(1e3,"replaced")}catch{}let c=new ne(s,t,u);if(this.channels.set(s,c),this.bySocket.set(t,c),c.send({type:"assigned",channel:s}),this.unrouted.length>0&&this.channels.size===1)for(let l of this.unrouted.splice(0))c.enqueue(l.request,l.pending);c.drainQueue(),this.broadcastChannels()}onWsClose(t){if(this.stagedSockets.delete(t))return;let e=this.bySocket.get(t);e&&(this.bySocket.delete(t),this.channels.delete(e.channel),e.failAllPending(new g("NOT_CONNECTED",`Figma plugin on channel "${e.channel}" disconnected.`,"Open the Reqwise plugin in Figma (Plugins \u2192 Reqwise) and wait for it to reconnect.")),this.broadcastChannels())}dispatch(t,e,r={}){return new Promise((o,s)=>{let u=be(),a=r.timeoutMs??he[t]??pe,c={id:u,op:t,resolve:o,reject:s,timeoutMs:a,...r.onProgress?{onProgress:r.onProgress}:{}},l={id:u,op:t,params:e,...r.chunk?{chunk:r.chunk}:{}};if(r.channel){let p=this.channels.get(r.channel);if(!p){s(new g("CHANNEL_NOT_FOUND",`No Figma window is connected on channel "${r.channel}".`,this.channels.size>0?`Connected channels: ${this.describeChannels()}. Use figma_read {op:"list_channels"} and pick one, or enter "${r.channel}" in the plugin UI of the window you want.`:"No plugin is connected at all. Open the Reqwise plugin in Figma and check its channel chip."));return}p.enqueue(l,c);return}if(r.sessionId){let p=this.sessionBindings.get(r.sessionId),_=p?this.channels.get(p.channel):void 0;if(p&&_){if(!p.notified){p.notified=!0;let d=`The user bound this session to channel "${p.channel}" (${_.info.fileName||"untitled"}) from the Figma plugin UI \u2014 operations now route to that window by default.`,h=c.resolve;c.resolve=y=>h({...y,warnings:[...y.warnings??[],d]})}_.enqueue(l,c);return}}if(this.channels.size===1){this.channels.values().next().value.enqueue(l,c);return}if(this.channels.size===0){if(this.unrouted.length>=$){s(new g("QUEUE_FULL",`Request queue is full (${this.unrouted.length}/${$}) \u2014 no plugin is connected to drain the queue.`,"Open the Reqwise Figma plugin so queued operations can run."));return}this.unrouted.push({request:l,pending:c});return}s(new g("AMBIGUOUS_CHANNEL",`${this.channels.size} Figma windows are connected \u2014 specify which channel to target.`,`Connected channels: ${this.describeChannels()}. Pass channel in the tool call (figma_write/figma_read {channel}), list details with figma_read {op:"list_channels"} \u2014 or ask the user to pick this agent session in the plugin UI of the window they want.`))})}describeChannels(){return[...this.channels.values()].map(t=>`"${t.channel}" (${t.info.fileName||"untitled"} \xB7 ${t.info.pageName||"?"})`).join(", ")}generateChannel(){for(let t=0;t<32;t++){let e=_e[ee(_e.length)],r=ve[ee(ve.length)],o=`${e}-${r}-${ee(10,100)}`;if(!this.channels.has(o))return o}return`channel-${be().slice(0,8)}`}handleHttp(t,e){let r=new URL(t.url??"/","http://localhost");if(t.method==="GET"&&r.pathname==="/health"){this.respondJson(e,200,this.healthPayload());return}if(t.method==="POST"&&r.pathname==="/rpc"){this.handleRpc(t,e);return}this.respondJson(e,404,{error:"not found"})}async handleRpc(t,e){let r=t.headers.authorization,o=typeof r=="string"&&r.startsWith("Bearer ")?r.slice(7):"";if(!this.authToken||o!==this.authToken){this.respondJson(e,401,{error:{code:"UNAUTHORIZED",message:"Invalid or missing bridge token.",hint:"Follower must send Authorization: Bearer <leader token from leader.json>."}});return}let s;try{s=JSON.parse(await it(t))}catch{this.respondJson(e,400,{error:{code:"INVALID_PARAMS",message:"Body must be JSON.",hint:"POST { op, params, sessionId?, channel? }."}});return}if(!this.handlers.onRpc){this.respondJson(e,500,{error:{code:"INTERNAL",message:"RPC handler not wired.",hint:"This is a server bug."}});return}try{let u=await this.handlers.onRpc(s.op??"",s.params??{},s.sessionId,s.channel);this.respondJson(e,200,{ok:!0,result:u})}catch(u){this.respondJson(e,200,{ok:!1,error:A(u)})}}healthPayload(){return{ok:!0,port:this.boundPort,pluginConnected:this.pluginConnected,plugin:this.plugin??null,channels:this.channelSummaries(),lastHeartbeatMs:this.lastHeartbeatMs,queueLength:this.queueLength,pendingCount:this.pendingCount}}startHeartbeatMonitor(){this.heartbeatTimer=setInterval(()=>{for(let t of this.channels.values())if(t.ws.readyState===te.OPEN&&(t.send({type:"ping",at:Date.now()}),Date.now()-t.lastHeartbeatAt>V))try{t.ws.terminate()}catch{}this.channels.size>0&&this.broadcastChannels()},ue),this.heartbeatTimer.unref?.()}respondJson(t,e,r){let o=JSON.stringify(r);t.writeHead(e,{"content-type":"application/json","content-length":Buffer.byteLength(o)}),t.end(o)}async close(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer);let t=new g("INTERNAL","Bridge shutting down.","Server is stopping.");for(let e of this.channels.values())e.failAllPending(t);for(let e of this.unrouted.splice(0))clearTimeout(e.pending.timer),e.pending.reject(t);if(this.wss)for(let e of this.wss.clients)try{e.terminate()}catch{}this.channels.clear(),this.bySocket.clear(),this.stagedSockets.clear(),await new Promise(e=>{if(!this.wss)return e();this.wss.close(()=>e())}),await new Promise(e=>{if(!this.http)return e();this.http.closeAllConnections?.(),this.http.close(()=>e())})}};function nt(n){if(typeof n!="string")return"";let t=n.trim();return/^[\w.-]{1,64}$/.test(t)?t:""}function rt(n){return Object.prototype.hasOwnProperty.call(n,"result")}function it(n){return new Promise((t,e)=>{let r="";n.setEncoding("utf8"),n.on("data",o=>{r+=o,r.length>8*1024*1024&&e(new Error("body too large"))}),n.on("end",()=>t(r)),n.on("error",e)})}import{tmpdir as ot}from"node:os";import{join as G}from"node:path";function M(){return G(ot(),"reqwise-figma-mcp")}function x(){return G(M(),ge)}function F(n){return G(M(),`leader-${n}.json`)}function re(){return G(M(),"cache")}import{request as ke}from"node:http";var st=13e4,ie=2e3,k=class n{constructor(t){this.info=t}info;static async checkHealth(t,e=1500){return(await n.fetchHealth(t,e))?.ok===!0}static fetchHealth(t,e=1500){return new Promise(r=>{let o=ke({host:"127.0.0.1",port:t,path:"/health",method:"GET",timeout:e},s=>{let u="";s.setEncoding("utf8"),s.on("data",a=>u+=a),s.on("end",()=>{try{r(JSON.parse(u))}catch{r(void 0)}})});o.on("error",()=>r(void 0)),o.on("timeout",()=>{o.destroy(),r(void 0)}),o.end()})}forward(t,e,r,o,s=st){let u=JSON.stringify({op:t,params:e,...r?{sessionId:r}:{},...o?{channel:o}:{}});return new Promise((a,c)=>{let l=ke({host:"127.0.0.1",port:this.info.port,path:"/rpc",method:"POST",timeout:s,headers:{"content-type":"application/json","content-length":Buffer.byteLength(u),authorization:`Bearer ${this.info.token}`}},p=>{let _="";p.setEncoding("utf8"),p.on("data",d=>_+=d),p.on("end",()=>{if(p.statusCode===401){c(new g("UNAUTHORIZED","Leader rejected the bridge token (401).","The leader restarted with a new token and no fresh discovery file was found \u2014 restart this MCP process to re-elect."));return}try{let d=JSON.parse(_);d.ok===!0?a(d.result):d.error?c(new g(d.error.code,d.error.message,d.error.hint)):c(new g("INTERNAL","Malformed /rpc response from leader.","Leader/follower version mismatch \u2014 restart both."))}catch{c(new g("INTERNAL",`Unparseable /rpc response (HTTP ${p.statusCode}).`,"Check the leader is a Reqwise MCP server."))}})});l.on("error",p=>c(at(p))),l.on("timeout",()=>{l.destroy(),c(new g("PLUGIN_TIMEOUT",`Forward of "${t}" to leader timed out.`,"The leader may be busy or dead \u2014 health monitor will attempt takeover."))}),l.write(u),l.end()})}};function at(n){let t=A(n,"NOT_CONNECTED","Could not reach the leader server on /rpc \u2014 it may have died; takeover will be attempted.");return new g(t.code,t.message,t.hint)}var J=class n{constructor(t){this.deps=t}deps;role="leader";bridge;follower;leaderInfo;healthTimer;closed=!1;electionAttempts=0;static MAX_ELECTION_ATTEMPTS=5;async start(){return this.electionAttempts=0,this.elect()}async elect(){if(this.electionAttempts++,this.electionAttempts>n.MAX_ELECTION_ATTEMPTS)throw new Error(`Could not become leader or follower after ${n.MAX_ELECTION_ATTEMPTS} attempts \u2014 port ${this.deps.startPort??38470}..+${9} may be held by a non-Reqwise process. Free one of those ports, or set FIGMA_MCP_PORT to a free port in ${38470}-${38479} (the range the Figma plugin scans).`);let t=this.deps.startPort??38470,e=pt(24).toString("hex");for(let r=0;r<10;r++){let o=t+r;if(await k.checkHealth(o))return await this.tryFollowOn(o)?"follower":(await oe(250),this.elect());let s=new W({onRpc:(u,a,c,l)=>this.deps.runValidated(u,a,c,l)});try{let u=await s.listen(o,e);return this.bridge=s,this.role="leader",this.leaderInfo={port:u,token:e,pid:process.pid,startedAt:Date.now(),version:O},await this.writeLeaderFile(this.leaderInfo),this.electionAttempts=0,this.deps.onBridgeCreated?.(s),"leader"}catch(u){if(await s.close().catch(()=>{}),!ht(u))throw u;if(await k.checkHealth(o))return await oe(200),this.elect();continue}}return await oe(250),this.elect()}async tryFollowOn(t){let e=await this.readLeaderFile(t);return!e||e.port!==t||!e.token?!1:(this.role="follower",this.follower=new k(e),this.startHealthMonitor(),this.electionAttempts=0,!0)}async forward(t,e,r,o,s){if(!this.follower)throw new g("INTERNAL","forward() called without a follower.","This is a server bug.");try{return await this.follower.forward(t,e,r,o,s)}catch(u){if(u instanceof g&&u.code==="UNAUTHORIZED"&&await this.refreshFollowerInfo())return this.follower.forward(t,e,r,o,s);throw u}}async refreshFollowerInfo(){let t=this.follower?.info;if(!t)return!1;let e=await this.readLeaderFile(t.port);return!e||e.port!==t.port||!e.token||e.token===t.token?!1:(this.follower=new k(e),!0)}startHealthMonitor(){let[t,e]=this.deps.healthIntervalMs??[3e3,5e3],r=async()=>{if(this.closed||this.role!=="follower"||!this.follower)return;if(!await k.checkHealth(this.follower.info.port).catch(()=>!1)){this.stopHealthMonitor();try{await this.removeLeaderFileIfStale(this.follower.info),await this.start()}catch{this.startHealthMonitor()}return}this.scheduleHealth(t,e,r)};this.scheduleHealth(t,e,r)}scheduleHealth(t,e,r){let o=t+Math.floor(Math.random()*Math.max(1,e-t));this.healthTimer=setTimeout(r,o),this.healthTimer.unref?.()}stopHealthMonitor(){this.healthTimer&&clearTimeout(this.healthTimer),this.healthTimer=void 0}async writeLeaderFile(t){await ct(M(),{recursive:!0}),await Te(F(t.port),t);let e=await D(x());e&&e.port!==t.port&&await k.checkHealth(e.port)||await Te(x(),t)}async readLeaderFile(t){let e=await D(F(t));if(e&&e.port===t)return e;let r=await D(x());if(r&&r.port===t)return r}async removeLeaderFileIfStale(t){let e=r=>!!r&&r.pid===t.pid&&r.startedAt===t.startedAt&&r.port===t.port;e(await D(F(t.port)))&&await Ie(F(t.port),{force:!0}),e(await D(x()))&&await Ie(x(),{force:!0})}info(){return this.leaderInfo??this.follower?.info}async close(){this.closed=!0,this.stopHealthMonitor(),this.role==="leader"&&(await this.removeLeaderFileIfStale(this.leaderInfo).catch(()=>{}),await this.bridge?.close().catch(()=>{}))}};function ht(n){return n instanceof g?n.code==="INTERNAL"&&/No free port/.test(n.message):!!n&&typeof n=="object"&&n.code==="EADDRINUSE"}async function D(n){try{let t=await dt(n,"utf8"),e=JSON.parse(t);return typeof e.port=="number"&&typeof e.token=="string"?e:void 0}catch{return}}async function Te(n,t){let e=`${n}.${process.pid}.tmp`;await lt(e,JSON.stringify(t,null,2),{mode:384}),await ut(e,n)}function oe(n){return new Promise(t=>{setTimeout(t,n).unref?.()})}import se from"node:vm";import{createHash as gt}from"node:crypto";import{mkdir as mt,readFile as ft,writeFile as yt}from"node:fs/promises";import{join as wt}from"node:path";var bt="lucide",Se={visibility:"eye","visibility-off":"eye-off",hide:"eye-off",show:"eye",delete:"trash",remove:"trash",bin:"trash",done:"check",checkmark:"check",success:"check",tick:"check",close:"x",cancel:"x",dismiss:"x",clear:"x",add:"plus",create:"plus",new:"plus",minus:"minus",subtract:"minus",edit:"pencil",modify:"pencil",write:"pencil",settings:"settings",gear:"settings",cog:"settings",preferences:"settings",search:"search",find:"search",magnify:"search",home:"home",house:"home",user:"user",person:"user",account:"user",profile:"user",people:"users",group:"users",menu:"menu",hamburger:"menu",more:"more-horizontal",overflow:"more-vertical",back:"arrow-left",forward:"arrow-right",next:"arrow-right",previous:"arrow-left",up:"chevron-up",down:"chevron-down",expand:"chevron-down",collapse:"chevron-up",notification:"bell",alert:"bell",warning:"alert-triangle",error:"alert-circle",info:"info",help:"help-circle",question:"help-circle",favorite:"heart",like:"heart",star:"star",bookmark:"bookmark",save:"save",download:"download",upload:"upload",share:"share",link:"link",copy:"copy",calendar:"calendar",date:"calendar",clock:"clock",time:"clock",mail:"mail",email:"mail",message:"message-square",chat:"message-circle",phone:"phone",call:"phone",camera:"camera",image:"image",photo:"image",file:"file",document:"file-text",folder:"folder",lock:"lock",secure:"lock",unlock:"unlock",logout:"log-out",login:"log-in",refresh:"refresh-cw",reload:"refresh-cw",sync:"refresh-cw",filter:"filter",sort:"arrow-up-down",cart:"shopping-cart",bag:"shopping-bag",location:"map-pin",pin:"map-pin",map:"map",play:"play",pause:"pause",stop:"square",volume:"volume-2",mute:"volume-x"};function Ee(n){let t=n.trim().toLowerCase().replace(/\s+/g,"-");return Se[t]??t}function Ae(n,t=8){let e=n.trim().toLowerCase().replace(/\s+/g,"-"),r=Ee(e),o=[],s=new Set,u=(a,c)=>{s.has(a)||(s.add(a),o.push({name:a,...c?{alias:c}:{},libraries:["lucide","ionicons","tabler","bootstrap-icons"]}))};u(r,r!==e?e:void 0);for(let[a,c]of Object.entries(Se)){if(o.length>=t)break;(a.includes(e)||c.includes(e)||e.includes(c))&&u(c,a)}return o.slice(0,t)}var _t={lucide:{url:n=>`https://unpkg.com/lucide-static@latest/icons/${n}.svg`},ionicons:{url:n=>`https://unpkg.com/ionicons@latest/dist/svg/${vt(n)}.svg`},tabler:{url:n=>`https://unpkg.com/@tabler/icons@latest/icons/outline/${n}.svg`},"bootstrap-icons":{url:n=>`https://unpkg.com/bootstrap-icons@latest/icons/${n}.svg`}};function vt(n){return{trash:"trash-outline",eye:"eye-outline","eye-off":"eye-off-outline",check:"checkmark-outline",x:"close-outline",plus:"add-outline",settings:"settings-outline",search:"search-outline",home:"home-outline",user:"person-outline"}[n]??`${n}-outline`}var kt=async n=>{let t=await globalThis.fetch(n);return{ok:t.ok,status:t.status,text:()=>t.text()}};async function Re(n,t={}){let e=t.library??bt,r=t.fetcher??kt,o=Ee(n),u=_t[e].url(o),a=wt(re(),`${e}__${It(o)}.svg`);try{let p=await ft(a,"utf8");if(p.length>0)return{svg:p,canonical:o,library:e,cached:!0}}catch{}let c=await r(u);if(!c.ok)throw new g("NODE_NOT_FOUND",`Icon "${n}" (resolved "${o}") not found in ${e} (HTTP ${c.status}).`,`Try searchIcons("${n}") for candidate names, or pass a different { library }.`);let l=await c.text();try{await mt(re(),{recursive:!0}),await yt(a,l,{mode:384})}catch{}return{svg:l,canonical:o,library:e,cached:!1}}function It(n){return gt("sha1").update(n).digest("hex").slice(0,16)}var Tt={create:"create",modify:"modify",delete:"delete",del:"delete",clone:"clone",move:"move",resize:"resize",group:"group",ungroup:"ungroup",flatten:"flatten",batch:"batch",findComponent:"find_component",findOrCreateComponent:"find_or_create_component",instantiate:"instantiate",createVariants:"create_variants",arrangeComponentSet:"arrange_component_set",setComponentDescription:"set_component_description",addComponentProperty:"add_component_property",componentize:"componentize",setupTokens:"setup_tokens",setupTextStyles:"setup_text_styles",setTextStyle:"set_text_style",setupEffectStyles:"setup_effect_styles",applyVariable:"apply_variable",createVariable:"create_variable",updateVariable:"update_variable",renameVariable:"rename_variable",deleteVariable:"delete_variable",exportTokens:"export_tokens",importTokens:"import_tokens",setText:"set_text",loadImage:"load_image",createPage:"create_page",setCurrentPage:"set_current_page",overlay:"create_overlay",zoomToFit:"zoom_to_fit",setSelection:"set_selection",getInstanceOverrides:"get_instance_overrides",setInstanceOverrides:"set_instance_overrides",detachInstance:"detach_instance",resetInstanceOverrides:"reset_instance_overrides",setSelectionColors:"set_selection_colors",setGradient:"set_gradient",setEffects:"set_effects",setReactions:"set_reactions",applyDesignSystem:"apply_design_system",readSelection:"read_selection",getNodeById:"get_node",getNode:"get_node",getNodes:"get_nodes",getChildren:"get_children",getDocumentInfo:"get_document_info",getSelection:"get_selection",getDesignContext:"get_design_context",searchNodes:"search_nodes",scanTextNodes:"scan_text_nodes",scanNodesByTypes:"scan_nodes_by_types",getStyles:"get_styles",getVariables:"get_variables",getComponents:"get_components",getComponent:"get_component",getLibraryComponent:"get_library_component",getDesignSystemKit:"get_design_system_kit",generateDesignMd:"generate_design_md",designFingerprint:"design_fingerprint",screenshot:"screenshot",exportNode:"export_node",getFonts:"get_fonts",layoutAudit:"layout_audit",auditDesignSystem:"audit_design_system",currentPage:"get_document_info",listChannels:"list_channels"};function St(n,t){let e,r=new Promise((o,s)=>{e=setTimeout(()=>{s(new g("PLUGIN_TIMEOUT",`figma_write exceeded the ${t}ms budget (async operation never completed).`,"An awaited promise never resolved (e.g. a bridge op that stalled, or a Promise that never settles). Split the work across calls, or ensure every await eventually resolves."))},t)});return Promise.race([n,r]).finally(()=>clearTimeout(e))}async function ae(n,t,e){let r=[],o=[],s={log:(...h)=>r.push(j(h)),info:(...h)=>r.push(j(h)),warn:(...h)=>r.push(`WARN: ${j(h)}`),error:(...h)=>r.push(`ERROR: ${j(h)}`),debug:(...h)=>r.push(j(h))},u=Et(t,e,o),a=h=>()=>{throw new g("SANDBOX_ERROR",`"${h}" is not available in figma_write.`,"Sandbox bans require/process/fetch/timers/eval. Use figma.* ops and plain JS only.")},c={figma:u,state:t.state,console:s,require:a("require"),process:a("process"),fetch:a("fetch"),setTimeout:a("setTimeout"),setInterval:a("setInterval"),setImmediate:a("setImmediate"),eval:a("eval"),Function:a("Function"),globalThis:void 0},l=se.createContext(c,{name:"figma_write"});new se.Script(`(() => {
      const CtxObjectProto = Object.prototype;
      const CtxFunctionProto = Function.prototype;
      // A poison constructor: any '.constructor' reached on a rewired injected
      // object/function lands here \u2014 a context-realm function whose own
      // .constructor is the (banned) context Function, never the host one.
      const Poison = function Poison() { throw new TypeError("blocked"); };
      const seen = new Set();
      const scrub = (v) => {
        if (v === null || (typeof v !== "object" && typeof v !== "function")) return;
        if (seen.has(v)) return;
        seen.add(v);
        // Reparent onto the context realm's prototype so the host realm is
        // unreachable through [[Prototype]].
        try { Object.setPrototypeOf(v, typeof v === "function" ? CtxFunctionProto : CtxObjectProto); } catch (_) {}
        // Own, non-configurable 'constructor' pointing at a context function \u2014
        // shadows any inherited host constructor and can't be redefined away.
        try {
          Object.defineProperty(v, "constructor", {
            value: Poison, writable: false, enumerable: false, configurable: false,
          });
        } catch (_) {}
        // Recurse into own function-valued props (e.g. figma.create, console.log).
        for (const k of Object.getOwnPropertyNames(v)) {
          let d; try { d = Object.getOwnPropertyDescriptor(v, k); } catch (_) { continue; }
          if (d && typeof d.value === "function") scrub(d.value);
        }
      };
      // 'figma', 'state', 'console' are the host objects injected above.
      scrub(figma);
      scrub(state);
      scrub(console);
      // Freeze so user code cannot restore a host-linked prototype.
      try { Object.freeze(Poison); Object.freeze(Poison.prototype); } catch (_) {}
    })();`,{filename:"figma_write.bootstrap.js"}).runInContext(l);let _=`(async function () {
"use strict";
${n}
}).call(undefined)`;t.writeCount++;let d;try{d=new se.Script(_,{filename:"figma_write.js"})}catch(h){return{ok:!1,logs:r,warnings:o,error:{code:"SANDBOX_ERROR",message:`Syntax error in figma_write code: ${h.message}`,hint:"Fix the JavaScript syntax. Modern ES (?., ??, spread, async/await) is supported."}}}try{let h=d.runInContext(l,{timeout:q}),y=await St(h,q);return{ok:!0,result:Mt(y),logs:r,warnings:o}}catch(h){if(h instanceof g)return{ok:!1,logs:r,warnings:o,error:{code:h.code,message:h.message,...h.hint?{hint:h.hint}:{}}};let y=h instanceof Error?h.message:String(h),m=/Script execution timed out/i.test(y);return{ok:!1,logs:r,warnings:o,error:{code:m?"PLUGIN_TIMEOUT":"SANDBOX_ERROR",message:m?`figma_write exceeded the ${q}ms budget.`:y,hint:m?"Split the work across multiple figma_write calls or use figma.batch() for many similar ops.":'The error is from your code or a figma op \u2014 check the message and figma_docs(section="api").'}}}}function Et(n,t,e){let r=async(a,c)=>{Pt(a,c,n,e);let l=await t.runOp(a,c);if(l.warnings?.length&&e.push(...l.warnings),!l.ok){let p=l.error??{code:"INTERNAL",message:`Operation ${a} failed.`};throw new g(p.code,p.message,p.hint)}return l.result},o={};o.mixed="mixed";for(let[a,c]of Object.entries(Tt))if(a!=="batch"){if(a==="getChildren"){o[a]=async l=>{let p=await r("get_node",{nodeId:l,includeChildren:!0});return xe(p?.children??[])};continue}if(a==="getNode"||a==="getNodeById"){o[a]=async(...l)=>{let p=await r("get_node",Oe("get_node",l));if(!p?.node)return p;let _=Ne(p.node);return p.children&&(_.children=xe(p.children)),_};continue}if(a==="currentPage"){o[a]=async()=>r("get_document_info",{scope:"page"});continue}o[a]=async(...l)=>r(c,Oe(c,l))}o.batch=async(a,c={})=>xt(a,t,e,c.resultDetail==="ids"?"ids":"full"),o.setupTokens=async a=>{let c=await r("setup_tokens",{tokens:a}),l=n.state.tokens??{},p=Rt(l,a,c);return n.state.tokens=p,c},o.searchIcons=a=>Ae(a),o.loadIcon=async(a,c={})=>{let l=await Re(a,{...c.library?{library:c.library}:{},...t.iconFetcher?{fetcher:t.iconFetcher}:{}});return r("load_icon",{name:a,canonical:l.canonical,library:l.library,svg:l.svg,...c.size!==void 0?{size:c.size}:{},...c.color!==void 0?{color:c.color}:{},...c.parentId!==void 0?{parentId:c.parentId}:{}})},o.loadImage=async(a,c={})=>{if(typeof a!="string"||a.length===0)throw new g("INVALID_PARAMS","loadImage requires a URL, a data: URI, or a base64 string.","Pass an https URL, a data:image/...;base64,... URI, or raw base64 bytes.");let l;if(/^https?:\/\//i.test(a))l=await Ot(a,t);else if(a.startsWith("data:")){let p=a.indexOf(",");l=p>=0?a.slice(p+1):a}else l=a;return r("load_image",{base64:l,...c})};let s={getNodeByIdAsync:"await figma.getNode(id)",createFrame:'await figma.create({ type: "FRAME", ... })',createText:'await figma.create({ type: "TEXT", characters: "...", ... })',createRectangle:'await figma.create({ type: "RECTANGLE", ... })',createEllipse:'await figma.create({ type: "ELLIPSE", ... })',createComponent:'await figma.create({ type: "COMPONENT", ... })',appendChild:"pass parentId in the create() spec, or figma.move(nodeId, { parentId })",insertChild:"pass parentId + insertAt in the create() spec, or figma.move(nodeId, { parentId, insertAt })",loadFontAsync:"not needed \u2014 create/modify load fonts automatically (fontName: { family, style })",getLocalPaintStylesAsync:"await figma.getStyles()",getLocalTextStylesAsync:"await figma.getStyles()",notify:"console.log(...) \u2014 logs are returned to the caller",closePlugin:"not applicable in this sandbox"},u=Object.keys(o).filter(a=>typeof o[a]=="function");return new Proxy(o,{get(a,c,l){if(typeof c=="symbol"||c in a)return Reflect.get(a,c,l);if(c==="then"||c==="toJSON"||c==="constructor"||c==="inspect")return;let p=String(c),_=s[p],d=At(p,u);return()=>{throw new g("SANDBOX_ERROR",`figma.${p} is not a sandbox method.`,_?`In this sandbox use: ${_}.`:`${d.length?`Did you mean: ${d.join(", ")}? `:""}See figma_docs(section="api") for the full method list.`)}}})}function At(n,t){let e=n.toLowerCase();return t.map(o=>{let s=o.toLowerCase(),u=0;if(s===e)u=100;else if(s.includes(e)||e.includes(s))u=50;else{let a=0;for(;a<Math.min(s.length,e.length)&&s[a]===e[a];)a++;u=a>=4?a:0}return{k:o,score:u}}).filter(o=>o.score>0).sort((o,s)=>s.score-o.score).slice(0,3).map(o=>o.k)}function Rt(n,t,e){let r={...n};for(let o of["colors","numbers","strings"]){let s=t[o];if(s&&typeof s=="object")for(let[u,a]of Object.entries(s))r[u]=a}return r}async function Ot(n,t){try{if(t.imageFetcher)return await t.imageFetcher(n);let e=await globalThis.fetch(n);if(!e.ok)throw new Error(`HTTP ${e.status}`);return Buffer.from(await e.arrayBuffer()).toString("base64")}catch(e){throw new g("INVALID_PARAMS",`Could not fetch image from URL: ${e.message}`,"Check the URL is reachable and points at an image, or pass base64 bytes directly.")}}function Oe(n,t){let e=t[0],r=t[1];switch(n){case"modify":return{nodeId:e,props:r};case"delete":return f(e)?e:{nodeId:e,...f(r)?r:{}};case"clone":case"move":case"resize":case"ungroup":case"flatten":case"zoom_to_fit":case"layout_audit":case"audit_design_system":case"export_node":case"arrange_component_set":case"componentize":return{nodeId:e,...f(r)?r:{}};case"get_node":return{nodeId:e,...f(r)?r:{}};case"get_nodes":return{nodeIds:e};case"get_component":return f(e)?e:{componentId:e};case"get_library_component":return f(e)?e:{key:e};case"detach_instance":case"reset_instance_overrides":return Array.isArray(e)?{nodeIds:e}:f(e)?e:{nodeId:e};case"set_text":return{nodeId:e,content:r};case"set_component_description":return f(r)?{nodeId:e,...r}:{nodeId:e,description:r};case"add_component_property":return f(e)?e:{nodeId:e,...f(r)?r:{}};case"apply_variable":return{nodeId:e,field:r,tokenName:t[2]};case"instantiate":return f(e)?{...e,...f(r)?r:{}}:{componentId:e,...f(r)?r:{}};case"create_variants":return{baseSpec:e,variants:r};case"find_component":return f(e)?e:{query:e};case"find_or_create_component":return{name:e,spec:r,...f(t[2])?t[2]:{}};case"setup_tokens":return f(e)?e:{tokens:e};case"setup_text_styles":return Array.isArray(e)?{styles:e}:f(e)?e:{styles:e};case"set_text_style":return{nodeId:e,style:r};case"setup_effect_styles":return Array.isArray(e)?{styles:e}:f(e)?e:{styles:e};case"create_variable":return f(e)?{...e,...f(r)?r:{}}:{name:e,...f(r)?r:{value:r}};case"update_variable":case"delete_variable":return f(e)?e:{variable:e,...f(r)?r:{}};case"rename_variable":return f(e)?e:{variable:e,newName:r};case"export_tokens":return f(e)?e:e!==void 0?{format:e}:{};case"import_tokens":return f(e)&&("tokens"in e||"modes"in e||"dtcg"in e)?{...e,...f(r)?r:{}}:{tokens:e,...f(r)?r:{}};case"create_page":return f(e)?e:{name:e};case"set_current_page":return f(e)?e:{pageId:e};case"load_image":return f(e)?e:{source:e};case"group":return f(e)?e:{nodeIds:e};case"search_nodes":return f(e)?e:{query:e};case"get_instance_overrides":return f(e)?e:e===void 0?{}:{nodeId:e};case"set_instance_overrides":return f(e)?e:{sourceId:e,targetIds:r};case"set_selection_colors":return f(e)?e:{nodeId:e,...f(r)?r:{}};case"set_gradient":return{nodeId:e,...f(r)?r:{}};case"set_effects":return{nodeId:e,effects:r};case"set_reactions":return{nodeId:e,reactions:r};case"apply_design_system":return f(e)?e:{nodeId:e,...f(r)?r:{}};case"create":case"create_overlay":{let o=f(e)?{...e}:{};return o.parentId===void 0&&(typeof r=="string"&&r.length>0?o.parentId=r:f(r)&&typeof r.id=="string"&&(o.parentId=r.id)),o}default:return f(e)?e:e===void 0?{}:{value:e}}}async function xt(n,t,e,r="full"){if(!Array.isArray(n)||n.length===0)throw new g("INVALID_PARAMS","batch() requires a non-empty array of { op, params }.",'Pass e.g. [{ op: "create", params: {...} }, ...].');let o=n.map((c,l)=>{try{let p=E(c.op,c.params);return{index:l,op:p.op,params:p.params}}catch(p){return{index:l,op:c.op,params:c.params,error:p}}}),s=[],u=n.length;for(let c=0;c<o.length;c+=P){let l=o.slice(c,c+P),p=Math.floor(c/P),_=Math.ceil(o.length/P),d=l.filter(m=>!m.error);for(let m of l.filter(b=>b.error))s.push({index:m.index,ok:!1,error:Nt(m.error)});if(d.length===0)continue;let h=await t.runOp("batch",{ops:d.map(m=>({op:m.op,params:m.params})),chunk:{index:p,total:_}});if(h.warnings?.length&&e.push(...h.warnings),!h.ok){let m=h.error??{code:"INTERNAL",message:"batch chunk failed"};for(let b of d)s.push({index:b.index,ok:!1,error:{code:m.code,message:m.message,...m.hint?{hint:m.hint}:{}}});continue}let y=h.result?.items??[];d.forEach((m,b)=>{let v=y[b];v&&v.ok?s.push({index:m.index,ok:!0,result:r==="ids"?Ct(v.result):v.result}):v?s.push({index:m.index,ok:!1,error:v.error??{code:"INTERNAL",message:"batch item failed"}}):s.push({index:m.index,ok:!1,error:{code:"INTERNAL",message:"no result for batch item",hint:"Plugin returned fewer items than sent."}})})}s.sort((c,l)=>c.index-l.index);let a=s.filter(c=>c.ok).length;return{total:u,ok:a,failed:u-a,results:s}}function Nt(n){return{code:n.code,message:n.message,...n.hint?{hint:n.hint}:{}}}function Ct(n){if(n&&typeof n=="object"){let t=n;if(typeof t.id=="string")return{id:t.id};let e=t.node;if(e&&typeof e.id=="string")return{id:e.id}}return n}function f(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Pt(n,t,e,r){if(e.paletteNudged||n!=="create"&&n!=="create_overlay"||!(t.fills!==void 0||t.fill!==void 0||t.strokes!==void 0))return;let s=e.state.tokens;f(s)&&Object.keys(s).length>0||(e.paletteNudged=!0,r.push('First draw with literal colors and no session tokens. If this file has variables/styles, read figma_rules and reuse them (applyVariable). If it has none and there is no design.md, read figma_docs(section="style") for a ready default scale/palette/elevation instead of inventing values (inventing is what makes output look generic), then figma.setupTokens/setupTextStyles from it so all screens share one system. A design.md in the codebase, if present, is the source of truth. (Shown once per session.)'))}function Ne(n){let t={...n};return typeof t.w=="number"&&t.width===void 0&&(t.width=t.w),typeof t.h=="number"&&t.height===void 0&&(t.height=t.h),t}function xe(n){return n.filter(f).map(t=>Ne(t))}function j(n){return n.map(t=>typeof t=="string"?t:Lt(t)).join(" ")}function Lt(n){try{return JSON.stringify(n)}catch{return String(n)}}function Mt(n){if(n!==void 0)try{return JSON.parse(JSON.stringify(n))}catch{return String(n)}}var Ce=`# Safe defaults & rules

The server/plugin layer prevents the classic AI drawing mistakes for you. Rely
on these instead of manual discipline.

## Scope a flow before drawing it
- When the request is a *flow* rather than one screen \u2014 "login/signup flow",
  "onboarding", "checkout", "the whole X journey" \u2014 the screen list is
  underspecified almost every time. Ask the user a few targeted questions
  BEFORE drawing, so the flow comes out complete instead of a thin happy path.
- Confirm at least: (1) the exact set of screens/steps and their order;
  (2) the states each screen needs (empty / loading / error / success /
  disabled); (3) auth or entry variations (social login, SSO, OTP / email
  verification, "remember me"); (4) platform & frame size (mobile 390\xD7844 vs
  desktop) and light/dark; (5) which real data or copy to show vs placeholder.
- One round of questions now is far cheaper than redrawing every screen after
  the user says "you missed the verify-email and error states". If the user
  says "just draw something", proceed \u2014 but state the screens/states you are
  assuming so they can correct you in one message.

## Verify first, always
- After any non-trivial draw, call \`figma_read({op:"layout_audit", nodeId})\`.
  It returns per-node \`declared\` vs \`rendered\` bounds, \`overflowsParent\`,
  \`clippedBy\`, \`textTruncated\`, \`zIndexWarnings\` and non-blocking
  \`styleWarnings\` (radius/padding/contrast consistency). Fix issues with data,
  not by eyeballing screenshots. Screenshots are for final human review only.

## Sizing & clipping
- A child auto-layout frame under a fixed-size parent defaults to
  \`counterAxisSizingMode: FIXED\` on the constrained axis unless you set it.
- Creating a node whose \`x+w > parent.w\` (or y/h) under a clipping parent
  still succeeds, but the response carries \`warnings: ["will be clipped \u2026"]\`.
  Read warnings; do not ignore them.

## Surfaces, radius & padding
- FRAME/COMPONENT without \`fill\`/\`fills\` is transparent by default. Use
  transparent frames for layout wrappers; declare a fill only for a visible
  card, input, button, panel or screen surface.
- Reuse radius tokens. Similar sibling cards/controls should not mix 0/8/12/16px
  arbitrarily. \`layout_audit\` reports radius mismatches in \`styleWarnings\`.
- Visible content containers need at least 12px edge padding; cards/sections
  normally use 16\u201324px. Flat \`paddingLeft\`/... fields and \`padding\` are both
  supported. \`layout_audit\` reports content that hugs a container edge.

## Overlays
- Never darken a screen by putting a semi-transparent FRAME on top \u2014 opacity on
  a FRAME dims the whole subtree. Use \`figma.overlay({color, opacity, parentId})\`.
  It creates a RECTANGLE sized to the parent at the correct layer.

## Text
- For wrapping text use \`create({type:"TEXT", wrap:true, ...})\`. The plugin sets
  \`layoutAlign:STRETCH\`, \`textAutoResize:HEIGHT\` and a sane \`lineHeight\`, and
  warns if the parent has no fixed width (nothing to wrap against).

## Z-order
- Control stacking with \`insertAt: "top" | "bottom" | {above:nodeId} |
  {below:nodeId} | <index>\` on create/move \u2014 never rely on creation order.

## Reuse before create
- Call \`figma.findComponent(query)\` (COMPONENT + COMPONENT_SET, fuzzy and
  set/variant path-aware) before
  creating. \`findOrCreateComponent(name, spec)\` makes reuse the default.
- When instantiating a component, prefer component \`props\` with the exact keys
  from the kit; use layer-name overrides only when no component property exists.

## Design system: two files, one direction
Keep the human's intent and the machine's snapshot in SEPARATE files \u2014 like
\`package.json\` vs \`package-lock.json\`.
- \`design.md\` \u2014 HUMAN-authored intent (palette, type ramp, brand voice, which
  components to have). Read it ONLY when BUILDING the design system; the tools
  never overwrite it. If it exists and the file has no DS yet, ask before
  building from it (building is expensive and edits the Figma file).
- \`design-kit.md\` \u2014 MACHINE-generated snapshot of what actually exists in
  Figma. Produce it with \`generate_design_md\` and save the returned markdown;
  its header carries a \`<!-- dsfp:\u2026 -->\` fingerprint. Regenerate freely \u2014 it has
  no hand-written content. Read it (not Figma) when DRAWING, so a screen build
  costs a file read, not a multi-thousand-token scan.
- Flow is always one direction at a time, ending in regenerate:
  build DS (from design.md or an interview) \u2192 \`generateDesignMd\` \u2192
  save design-kit.md. Figma is the source of truth; design-kit.md is its
  projection. Never two-way-sync the kit file by hand.
- At the start of a DRAW session, call \`design_fingerprint\` and compare its
  \`hash\` to the \`dsfp:\` in design-kit.md. Match \u2192 trust the file. Mismatch \u2192
  someone changed the DS in Figma without regenerating; regenerate first. Names
  are resolved live at draw time (instantiate by name, applyVariable by token
  name), so a slightly stale file fails loudly (name miss + candidates) rather
  than binding the wrong thing.
- Consume by NAME, never by id: token names and component names are the stable
  API; ids change between sessions, so design-kit.md deliberately drives via
  names + fingerprint, not ids.

## Fonts
- Every text op preflights font availability. An unavailable family resolves
  through requested \u2192 Inter \u2192 system and the response reports
  \`{requestedFont, resolvedFont, reason}\`. Never a silent swap, never a crash.

## Batch
- Many similar ops \u2192 \`figma.batch(ops)\`. It streams in chunks (partial commit,
  exact per-index errors). See \`figma_docs(section:"recipes")\`.
`;var Pe='# Relative layout \u2014 let the plugin do the math\n\nAvoid manual x/y arithmetic. Positioning helpers compute coordinates from the\nparent so a resize of the parent doesn\'t strand children.\n\n## inset\nPin a node to its parent\'s edges:\n\n```js\nawait figma.create({\n  type: "FRAME", parentId: card.id,\n  inset: { left: 16, right: 16, top: 12, bottom: 12 }\n});\n```\nThe plugin derives x/y/w/h from the parent minus the insets. Omit a side to\nleave that dimension to the node\'s own size.\n\n## align \u2014 position the NODE in its parent\nCenter a whole node without computing offsets:\n\n```js\nawait figma.create({ type: "FRAME", parentId: hero.id, align: "center", w: 200, h: 48 });\n```\n`align`: `"center-x" | "center-y" | "center"`. This moves the node\'s box\n(equivalent to setting x/y); it does NOT align the content inside a TEXT node.\n\n## textAlignHorizontal / textAlignVertical \u2014 align text CONTENT in its box\nTo center the characters inside a TEXT node\'s own frame (the usual meaning of\n"center this text"), set `textAlignHorizontal` \u2014 NOT `align`:\n\n```js\nawait figma.create({\n  type: "TEXT", parentId: card.id, characters: "Welcome",\n  layoutAlign: "STRETCH",            // make the text box span the parent width\n  textAlignHorizontal: "CENTER",     // center the glyphs within that box\n});\n```\n`textAlignHorizontal`: `"LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"`.\n`textAlignVertical`: `"TOP" | "CENTER" | "BOTTOM"`. Both work on create and\nmodify; an invalid value throws INVALID_PARAMS (it is never silently ignored).\nNote: for a hug-width text node, LEFT vs CENTER looks identical \u2014 give the node\na width (`layoutAlign:"STRETCH"` or an explicit `w`) so the alignment is\nvisible.\n\n## Auto-layout sizing\n- `layoutMode: "VERTICAL" | "HORIZONTAL"` turns a frame into an auto-layout.\n- Under a fixed-size parent, the constrained axis defaults to\n  `counterAxisSizingMode: FIXED` (no overflow) unless you override it.\n- Use `primaryAxisSizingMode`/`counterAxisSizingMode` = `"AUTO"` (hug) or\n  `"FIXED"` deliberately; `layoutAlign:"STRETCH"` makes a child fill the cross\n  axis.\n\n## padding\n`padding: 16`, `padding: {left: 16, ...}`, or the Figma-native flat fields\n`paddingLeft`/`paddingRight`/`paddingTop`/`paddingBottom`.\n\n## Z-order (insertAt)\nOn create/move: `insertAt: "top" | "bottom" | {above: nodeId} | {below: nodeId}\n| index`. Overlays and dropdowns almost always want `"top"`.\n\nFor transparent-wrapper vs visible-surface rules, spacing minimums, and the\nverify-first `layout_audit` loop, see figma_docs(section="rules").\n';var Le='# figma_write proxy API\n\nInside `figma_write({code})` you have: `figma` (proxy), `state` (persistent\nobject), `console`, and standard JS globals. Every `figma.*` method returns a\nPromise (one bridge round-trip). Modern ES is supported (`?.`, `??`, spread,\nasync/await, destructuring). Banned: require, process, fetch, setTimeout, eval.\n\nThis proxy is NOT the official Figma Plugin API \u2014 the method set differs\n(no createFrame/appendChild/loadFontAsync; use create/parentId/fontName).\nCalling an unknown method throws an error that names the sandbox equivalent.\n\n## Colors\nEverywhere a color is accepted (fills, strokes, gradient stops, effects,\noverlay): `"#rrggbb"` / `"#rrggbbaa"` hex strings, or `{r,g,b[,a]}` objects\nwith channels 0..1 (the official Figma shape; 0..255 ints are auto-detected).\nA malformed color THROWS \u2014 it is never silently replaced.\n\n## Creation & mutation\n- `create(spec)` \u2192 new node. spec.type is FRAME/TEXT/RECTANGLE/... plus\n  parentId, size, fills, and layout helpers (inset/align/insertAt/wrap).\n  `create(spec, parentId)` also works, but prefer parentId inside the spec.\n  OMITTING parentId puts the node at PAGE level \u2014 always parent screen\n  content explicitly.\n  FRAME/COMPONENT nodes are transparent when both `fill` and `fills` are\n  omitted (Figma\'s default white fill is cleared), so structural wrappers do\n  not become accidental white slabs. Declare a fill for visible surfaces.\n  Padding accepts `padding: 16`, `padding: {left, right, top, bottom}`, or\n  flat `paddingLeft`/`paddingRight`/`paddingTop`/`paddingBottom`.\n  Radius accepts `cornerRadius` plus the common `borderRadius`/`radius`\n  aliases and per-corner radius fields.\n  `children: [spec, ...]` builds a whole subtree in ONE call \u2014 each entry is a\n  full create spec (its own type/fills/tokens/textStyle/children), parented to\n  the node being created, in array order (index 0 = bottom of the z-stack). This\n  is the reliable way to lay out a screen: declare the tree once instead of\n  appending node-by-node. (INSTANCE children aren\'t supported inside `children` \u2014\n  instantiate components, then `move` them into the built frame.)\n- `modify(nodeId, props)` \u2192 patch properties.\n- `delete(nodeId, {force})` (alias `del`).\n- `clone(nodeId, {parentId, insertAt})` \u2192 `{id, childMap}` mapping ORIGINAL\n  child ids \u2192 CLONED child ids, so you edit the right descendant without\n  name-search.\n- `move(nodeId, {x,y,parentId,insertAt})`, `resize(nodeId,{w,h})`.\n- `group(nodeIds)`, `ungroup(nodeId)`, `flatten(nodeId)`.\n- `batch(ops, {resultDetail?})` \u2014 see recipes; streams in chunks with partial\n  commit. `resultDetail: "ids"` trims each successful item to just its id\n  (skip echoing a full node per item on large create batches).\n\n## Components\n- `findComponent(query)` fuzzy match across COMPONENT and COMPONENT_SET nodes\n  (normalized name, set/variant /-path aware). Results expose type/path and a\n  component set\'s defaultVariantId.\n- `findOrCreateComponent(name, spec, {dryRun, threshold})` \u2014 reuse-first.\n  Always returns `decision: "reuse"|"create"` + `score` + `reason`;\n  `dryRun: true` decides without creating (create branch lists candidates).\n- `instantiate(componentIdOrName, {parentId, props, overrides})` \u2014 pass a\n  component id OR a name query ("Button/Primary"); names resolve via the same\n  fuzzy match as findComponent (below-threshold \u2192 error listing candidates).\n  Result carries `resolved: {via: "id"|"query", score?}`. Prefer `props`\n  for Figma component properties; use layer-name `overrides` only as a fallback.\n  Text overrides on layers wired to a component property are applied through\n  setProperties (auto-layout reflows correctly); the result reports each one in\n  `overridesApplied: [{target, field, appliedVia: "property"|"name", ok}]`.\n- `createVariants(baseSpec, variantsOrAxes)` \u2014 real Figma component set.\n  Multi-axis: pass `{Size: ["sm","md"], State: ["default","hover"]}` \u2192\n  Cartesian matrix ("Size=sm, State=hover", max 50 combos). Legacy single-axis\n  list still works; object entries may add per-variant spec overrides\n  (`{name: "State=Hover", fills: [...]}`).\n- `arrangeComponentSet(setId, {gap, padding, columnsBy})` \u2014 grid the variants\n  of a COMPONENT_SET: columns iterate `columnsBy` (default: last axis),\n  rows iterate the remaining axis combinations; the set resizes to fit.\n- `setComponentDescription(id, "markdown text")` (or\n  `{description, documentationLinks: [{uri}]}`) \u2014 document a COMPONENT /\n  COMPONENT_SET; empty string clears. get_component reads it back.\n- `addComponentProperty(nodeId, { name, type, defaultValue?, layerId?,\n  preferredValues? })` \u2014 define a BOOLEAN | TEXT | INSTANCE_SWAP property on a\n  COMPONENT / COMPONENT_SET (add to the SET, not a variant). Pass `layerId` to\n  WIRE it: BOOLEAN\u2192that layer\'s visibility, INSTANCE_SWAP\u2192an instance layer\'s\n  swappable component, TEXT\u2192a text layer\'s characters. This is how you avoid the\n  variant explosion \u2014 icon presence/side become boolean + swap props, not extra\n  variant axes (a Button becomes Size\xD7Style\xD7State variants + `hasIconLeft`/\n  `hasIconRight`/`iconOnly` booleans + `icon` swap). `preferredValues` is a list\n  of component keys offered in the swap picker. VARIANT axes come from\n  createVariants, NOT here.\n- `getLibraryComponent(key)` \u2014 import a component/set from a PUBLISHED\n  shared library by key; returns the same rich shape as get_component\n  (props + variants + anatomy = reconstruction spec). Instantiate the result\n  via its id.\n- `detachInstance(idOrIds)` / `resetInstanceOverrides(idOrIds)` \u2014 detach\n  instance(s) into plain frames / reset instance(s) to the main component.\n  Per-target try/catch; result lists ok/error per id.\n- `componentize(nodeId, {name, replaceCopies, scope})` \u2014 turn a drawn tree\n  into a COMPONENT in place and (default on) replace every structural copy\n  (same type/name tree) on the page \u2014 or `scope: "document"` \u2014 with an\n  instance at the same spot. Draw once, reuse everywhere.\n\n## Tokens & variables\n- `setupTokens(tokensJson)` \u2014 DTCG-ish {colors, numbers, strings} \u2192 Variables,\n  idempotent, stored in `state.tokens`. Sets ALL modes explicitly.\n- `setupTextStyles(styles)` \u2014 typography ramp \u2192 LOCAL text styles, upserted by\n  name (idempotent, like setupTokens). Each entry: `{ name, fontSize,\n  fontFamily?, weight? (100\u2013900) | fontStyle? ("Medium"), lineHeight?\n  (px | "150%" | "auto"), letterSpacing?, description? }`. Fonts resolve\n  through the fallback chain; substitutions come back as warnings.\n- `setTextStyle(nodeId, styleNameOrId)` \u2014 apply a local text style to a TEXT\n  node; a miss throws listing candidate names.\n- `setupEffectStyles(styles)` \u2014 elevation ramp \u2192 LOCAL effect styles, upserted\n  by name (idempotent). Each entry: `{ name, effects:[<shadow|blur>...],\n  description? }` where each effect is the same shape as create({effects}):\n  `{type:"DROP_SHADOW", color:"#rrggbbaa", offset:{x,y}, radius, spread?}` or\n  `{type:"LAYER_BLUR", radius}`. This is what makes elevation TOKENIZABLE \u2014\n  define `elevation/card`, `elevation/overlay` once, reuse everywhere. Prefer\n  layered, low-alpha, ink-tinted shadows over one harsh black shadow; see\n  figma_docs(section="style"). Apply with setEffects or by binding the style.\n- `applyVariable(nodeId, field, tokenName)` \u2014 friendly fields expand:\n  `fill`\u2192fills, `cornerRadius`\u2192all four corners, `padding`\u2192all four paddings.\n- **Create-time binding (prefer this over hex-then-bind):** in a create spec,\n  `fill: "$color/primary/500"` / `stroke: "$..."` bind that variable as the\n  paint, `textStyle: "Title 02"` applies a text style to a TEXT node, and\n  `tokens: { cornerRadius: "radius/md", padding: "space/4" }` binds any other\n  field \u2014 one call, no follow-up applyVariable. Unknown token/style names throw\n  BEFORE the node is created.\n- Variable CRUD: `createVariable(name, {value|valuesByMode, type?, collection?,\n  description?})` (type inferred from the value; `value` writes ALL modes,\n  `valuesByMode: {light: "#fff", dark: "#111"}` targets/creates modes),\n  `updateVariable(nameOrId, {value|valuesByMode|description})`,\n  `renameVariable(nameOrId, newName)` (bindings follow the id \u2014 refs kept),\n  `deleteVariable(nameOrId, {replaceWith?, force?})` \u2014 replace-gated: if the\n  variable is still bound anywhere the delete fails and tells you the usage\n  count; `replaceWith` rebinds every consumer first. Batch them via\n  `figma.batch([{op: "create_variable", params: {...}}, ...])`.\n- `exportTokens({format: "dtcg"|"css"|"tailwind", collection?, mode?,\n  allModes?})` \u2014 variables \u2192 DTCG JSON (aliases as "{a.b}" refs; allModes\n  keys by mode), CSS custom properties (non-default modes as\n  `[data-theme="mode"]` blocks, aliases as var() refs), or a Tailwind theme\n  extension (colors + spacing).\n- `importTokens(dtcgTree, {collection?, mode?})` or\n  `importTokens({modes: {light: tree, dark: tree}})` \u2014 upsert variables by\n  name; missing modes are created; "{a.b}" aliases resolve after literals\n  land; conflicts/unresolved aliases warn instead of failing.\n\n## Text & assets\n- `setText(nodeId, content)`.\n- `searchIcons(query)` \u2192 candidate canonical names (no fetch).\n- `loadIcon(name, {library, size, color, parentId})` \u2014 SVG fetched server-side,\n  drawn by the plugin.\n- `loadImage(urlOrBase64)`.\n\n## Edit-in-place (composite ops)\nThese change existing nodes rather than drawing new ones. See the\n"Edit-in-place lifecycle" in figma_docs(section="recipes").\n- `getInstanceOverrides(nodeId?)` \u2192 the overrides of a component instance\n  (defaults to the current selection). Pair with setInstanceOverrides.\n- `setInstanceOverrides(sourceId, targetIds)` \u2014 format-painter: copy the\n  overrides captured from `sourceId` onto every instance in `targetIds`\n  (`targetIds` is a non-empty array). Both must be instances of the same\n  component.\n- `setSelectionColors(nodeId, { from?, to, includeStrokes? })` \u2014 recursively\n  recolor a subtree: swap every fill matching `from` (hex; omit to replace ALL\n  solid fills) to `to`. `includeStrokes: true` also recolors strokes. `nodeId`\n  optional \u2192 current selection.\n- `setGradient(nodeId, { type, stops, transform?, target? })` \u2014 paint a\n  gradient. `type` \u2208 LINEAR | RADIAL | ANGULAR | DIAMOND. `stops` is \u22652\n  `{ position: 0..1, color: "#rrggbb" | "#rrggbbaa" }`. `transform` is the 2\xD73\n  gradient matrix; omit it to use the default (LINEAR left\u2192right:\n  `[[1,0,0],[0,1,0]]`). `target` \u2208 "fill" (default) | "stroke".\n- `setEffects(nodeId, effects)` \u2014 replace a node\'s effects. Each effect is a\n  shadow/blur object: `{ type: "DROP_SHADOW" | "INNER_SHADOW" | "LAYER_BLUR" |\n  "BACKGROUND_BLUR", color?: "#rrggbbaa", offset?: { x, y }, radius, spread? }`.\n  Shadows need `color`/`offset`/`radius` (`spread` optional); blurs need only\n  `radius`.\n- `setReactions(nodeId, reactions)` \u2014 replace a node\'s prototype reactions\n  (click-through wiring). Each reaction: `{ trigger: { type: "ON_CLICK" |\n  "ON_HOVER" | "AFTER_TIMEOUT" | ... }, action: { type: "NODE", destinationId,\n  navigation?: "NAVIGATE" | "SWAP" | "OVERLAY", transition?,\n  preserveScrollPosition? } }` (also `{ type: "BACK" | "CLOSE" }` and\n  `{ type: "URL", url }`). Omitted `transition` defaults to SMART_ANIMATE /\n  EASE_IN_AND_OUT / 0.3s; pass `transition: null` for an instant jump.\n  `destinationId` must be an existing node; `[]` clears all reactions. Example:\n  `setReactions(btn.id, [{ trigger: { type: "ON_CLICK" }, action: { type:\n  "NODE", destinationId: frame.id, navigation: "NAVIGATE" } }])`.\n\n## Design-system compliance\n- `auditDesignSystem(nodeId)` \u2014 scan a subtree and report which raw values are\n  hardcoded over an EXISTING token/style. Returns `compliance` (0\u20131) and, per\n  finding, `{ id, field, value, kind, suggestions? }`: `kind: "hardcoded"` means\n  a token/style already expresses this value but the node isn\'t bound (fix by\n  apply_variable / set_text_style, or re-create with `fill: "$token"` /\n  `textStyle`); `kind: "off-system"` means no token matches (add a token or\n  accept as a one-off). `suggestions` lists EVERY matching token/style (floats\n  and hexes can collide \u2014 cornerRadius puts radius-named tokens first); pick the\n  semantically right one, don\'t assume the first. A screen can pass layout_audit\n  yet fail this \u2014 it\'s the token/style verify layer. Read-only; never rebinds.\n- `applyDesignSystem(nodeId, { dryRun? })` \u2014 the write counterpart: runs the\n  same scan, then AUTO-BINDS every finding whose `suggestions` is exactly one\n  token/style (fill/stroke/cornerRadius \u2192 variable, TEXT \u2192 text style).\n  Ambiguous findings (several tokens share the value) are never guessed \u2014\n  returned under `needsChoice` to resolve manually; `offSystem` values are left\n  untouched. `dryRun: true` reports the would-bind `applied` list without\n  mutating \u2014 preview before normalising a hand-drawn screen. Returns\n  `{ appliedCount, applied, needsChoice, offSystem, failed? }`.\n\n## Reads (usable from write code too)\n- `getNode(id)` (alias `getNodeById`) \u2192 a flat SNAPSHOT object\n  ({id, name, type, x, y, w/width, h/height, fill, childCount, ...}), NOT a\n  live node \u2014 mutate via modify(), not property assignment.\n- `getNodes(ids)`, `getChildren(id)` \u2192 array of child snapshots.\n- `searchNodes({query, nodeId?, types?, limit?})` \u2014 matches layer names AND\n  text content; scoped under nodeId when given. Default `limit` is 50; when more\n  matched, the result carries `hasMore`/`totalMatched` \u2014 narrow the query or\n  raise `limit` rather than assuming the list is complete.\n- `getSelection()`, `getDocumentInfo()`, `getDesignContext({nodeId?, detail?,\n  depth?})` \u2014 a WHOLE-PAGE read (no nodeId) defaults to `sparse` because a page\n  can be tens of thousands of tokens; pass a nodeId to deep-read one subtree, or\n  detail:"compact"/"full" for more per-node data.\n- `readSelection({ detail?, depth? })` \u2014 deep read of the CURRENT selection in\n  one call (ids, types, bounds, text, fills). The entry point for editing what\n  the user picked: readSelection \u2192 modify \u2192 layoutAudit.\n- `getStyles()`, `getVariables()`, `getComponents({detail:"design"})`,\n  `getComponent(componentId)`, `getDesignSystemKit({depth?})`, `getFonts(families)`.\n- `generateDesignMd(...)` \u2192 `{ markdown, fingerprint, extraction }`. The\n  markdown is the machine-generated design-kit file (save it as `design-kit.md`\n  in the codebase, NOT hand-edited); its top carries a `<!-- dsfp:\u2026 -->`\n  fingerprint of the DS shape.\n- `designFingerprint()` \u2192 `{ counts, hash }` \u2014 a CHEAP shape hash of the current\n  design system (token/style/component NAMES + counts), no full scan. At the\n  start of a draw session, compare it to the `dsfp:` in the cached\n  design-kit.md: if they differ the DS changed since the file was written \u2014\n  regenerate before trusting it. Renaming/adding/removing a token or component\n  changes the hash; recolouring an existing token does not.\n- `generateDesignMd({ depth?, screenDepth?, includeAnatomy?, includeScreens?,\n  includeComponentUsage?, maxComponents?, maxScreens?, maxInstances?,\n  maxVariantsPerComponent?, maxTextLayersPerComponent?, maxOutputChars? })` \u2014\n  the durable spec of an existing Figma system: coverage, screen composition,\n  observed usage, exact ids/keys/variants/property keys, token names, style refs\n  and text layers. Call it before building UI from an existing system and save\n  the markdown as `design.md`. Output limits omit whole sections rather than\n  slicing Markdown. (See the "Reuse before create" rule in\n  figma_docs(section="rules").)\n- `screenshot({nodeId, scale})`, `exportNode({nodeId, format})`. PNG/JPG come\n  back as a real image the model can SEE (an MCP image block), not a base64 text\n  blob \u2014 so a screenshot is a genuine visual check, not a token sink. Still take\n  ONE at the end, not repeatedly. SVG/PDF return as data.\n- `layoutAudit(nodeId)` \u2014 structured verify.\n\n## Misc\n- `currentPage()`, `createPage(name)` (preflights plan limit \u2192 on failure\n  returns `{fallback:"current-page", reason}`, never throws mid-flow), and\n  `setCurrentPage(pageId|{name})` to switch the visible target page before\n  selection/zoom operations.\n- `zoomToFit(nodeId)`, `overlay(spec)`.\n- `listChannels()` \u2014 connected Figma windows (server-answered, no plugin\n  round-trip): `[{channel, plugin:{fileName,pageName,...}, queueLength}]`.\n\n## Channels (multiple Figma windows)\nEach Figma window running the plugin joins a **channel** (shown as a chip in\nthe plugin UI). With ONE window you never think about this \u2014 everything\nauto-routes. With SEVERAL windows either:\n- pass `channel` in the tool call: `figma_write({code, channel})`,\n  `figma_read({op, params, channel})` \u2014 pick one via\n  `figma_read({op:"list_channels"})`; or\n- ask the user to click YOUR session in the plugin UI of the window they want\n  ("AI agents connected" list). After that your ops route there by default and\n  your next result carries a one-time warning naming the bound channel.\n`AMBIGUOUS_CHANNEL` / `CHANNEL_NOT_FOUND` errors list the open channels in\ntheir hint. Each channel has its own serial queue, so agents on different\nwindows run in parallel.\n\n## Sessions\nEach MCP connection (one Claude Code / Codex instance) gets a private session\nautomatically \u2014 `state` is NOT shared across agents unless you pass an\nexplicit shared `sessionId`. `figma_status` reports `mySessionId` and (if\nthe user paired you to a window) `myBoundChannel`.\n\n## Errors\nEvery failure throws `{code, message, hint}`. Read `hint` \u2014 it names the next\nconcrete step (e.g. wrong nodeId, missing font, use overlay()).\n';var Me=`# Design tokens & variables

Set tokens up ONCE per session, then reference them by name. The session token
map lives in \`state.tokens\` and survives across figma_write calls.

## Setup (idempotent)
\`\`\`js
await figma.setupTokens({
  colors:  { primary: "#2563EB", surface: "#0B0B0F", "on-surface": "#F5F5F7" },
  numbers: { "radius-md": 8, "space-4": 16 },
  strings: { "font-body": "Inter" }
});
\`\`\`
Re-running with the same names updates values without creating duplicates.

## Multi-mode (light/dark)
Variables get values for ALL modes explicitly. Provide per-mode values:
\`\`\`js
await figma.setupTokens({
  colors: { surface: { light: "#FFFFFF", dark: "#0B0B0F" } }
});
\`\`\`
This fixes the figma-ui-mcp bug where only the current mode was set and the
other mode silently kept the default.

## Applying a token
\`\`\`js
await figma.applyVariable(node.id, "fills", "primary");
await figma.applyVariable(frame.id, "cornerRadius", "radius-md");
\`\`\`

## Prefer tokens over raw hex
Once you have set up tokens, bind them with \`applyVariable\` instead of writing
the same hex literal again \u2014 it keeps themes coherent and lets a single edit
re-theme everything. The session token map is available at \`state.tokens\`
(name \u2192 value) so you can look names up without re-declaring them.

## Reading
\`figma.getVariables()\` (or \`figma_read\`) lists collections, modes and
variables \u2014 use it to discover what a design system already defines before
adding new tokens.
`;var Fe='# Icons\n\nIcons resolve across libraries by semantic name. The server keeps a cross-\nlibrary alias map so you can ask for what you *mean* and get the name each\nlibrary actually ships.\n\n## Search first (cheap, no fetch)\n```js\nconst candidates = await figma.searchIcons("visibility");\n// \u2192 [{ name: "eye", alias: "visibility", libraries: [...] }, ...]\n```\n`searchIcons` never downloads SVGs \u2014 it only resolves candidate canonical\nnames so you can pick before paying for a fetch.\n\n## Common aliases\n`visibility \u2192 eye`, `delete \u2192 trash`, `done/checkmark \u2192 check`,\n`close/cancel \u2192 x`, `add \u2192 plus`, `edit \u2192 pencil`, `settings \u2192 gear`,\n`more \u2192 more-horizontal`, `back \u2192 arrow-left`, `logout \u2192 log-out`, and ~40\nmore. Unknown names pass through unchanged.\n\n## Load & draw\n```js\nawait figma.loadIcon("visibility", { library: "lucide", size: 24, color: "#F5F5F7", parentId: btn.id });\n```\nThe SVG is fetched server-side (unpkg), cached on disk under\n`$TMPDIR/reqwise-figma-mcp/cache/`, then handed to the plugin which turns the\nSVG into Figma vector nodes. Supported libraries: `lucide` (default),\n`ionicons`, `tabler`, `bootstrap-icons`.\n\n## When an icon is missing\nA miss throws `NODE_NOT_FOUND` with a hint to `searchIcons` again or try a\ndifferent `{ library }`. The "localhost-only" rule is about the Figma bridge \u2014\nicon/image loading is an allowed, cached external fetch.\n';var De=`# Recipes

## Session state
\`state\` is a plain object that persists across figma_write calls in the same
session. Set up token maps and id registries once, reuse them later:
\`\`\`js
// call 1
await figma.setupTokens({ colors: { primary: "#2563EB" } });
state.rootId = (await figma.create({ type: "FRAME", name: "Screen", width: 390, height: 844, fill: "#FFFFFF" })).id;
// call 2 (same sessionId) \u2014 state.rootId is still here
await figma.create({ type: "TEXT", parentId: state.rootId, characters: "Hi", wrap: true });
\`\`\`
Omit \`sessionId\` to use the default session.

## Verify-first workflow
\`\`\`js
const card = await figma.create({ type: "FRAME", name: "Card", width: 320, height: 200, layoutMode: "VERTICAL", padding: 16, cornerRadius: 16, fill: "#FFFFFF" });
await figma.create({ type: "TEXT", parentId: card.id, wrap: true, characters: "A long paragraph that must wrap\u2026" });
const audit = await figma.layoutAudit(card.id);
if (audit.summary.issues.length) console.warn(audit.summary.issues);
\`\`\`
Then take a screenshot only for the human. \`layoutAudit\` separates blocking
technical defects in \`summary.issues\` from non-blocking \`summary.styleHints\`
such as low contrast, tight padding and inconsistent radius. A screenshot is
still the final visual check for composition and brand fit.

## Overlay (modal scrim)
\`\`\`js
await figma.overlay({ parentId: screen.id, color: "#000000", opacity: 0.5, insertAt: "top" });
\`\`\`
Never a semi-transparent FRAME \u2014 that dims the whole subtree.

## Batch streaming (many similar ops)
\`\`\`js
const ops = rows.map((r, i) => ({ op: "create", params: { type: "TEXT", parentId: list.id, characters: r.label } }));
const res = await figma.batch(ops); // { total, ok, failed, results:[{index, ok, result?, error?}] }
res.results.filter(r => !r.ok).forEach(r => console.error(r.index, r.error.message));
\`\`\`
Chunks of 20 stream sequentially. A failing item fails ONLY its index (partial
commit, no rollback); its error is reported at the exact index.

## Insert order (z-index)
\`\`\`js
await figma.create({ type: "RECTANGLE", parentId: screen.id, insertAt: { above: header.id } });
\`\`\`

## Reuse a component
\`\`\`js
const btn = await figma.findOrCreateComponent("Button/Primary", { type: "COMPONENT", /* spec */ });
await figma.instantiate(btn.id, {
  parentId: screen.id,
  props: { "Label#1:2": "Save" }, // exact keys come from generateDesignMd/getComponent
  overrides: { "Label": { text: "Save" } }, // fallback only
});
\`\`\`

## Design system: two files, one direction
Two SEPARATE files (like package.json vs package-lock.json):
\`design.md\` = human intent (you read it only when BUILDING the DS);
\`design-kit.md\` = machine snapshot of what's really in Figma (you read it when
DRAWING). See the full convention in figma_docs(section="rules").

### A. Build the design system (once), then snapshot it
\`\`\`js
// If the codebase has a human-written design.md, build FROM it (ask the user
// first \u2014 building edits the Figma file). Otherwise interview the user.
await figma.setupTokens({ colors: { "color/primary": "#5865f2", /* ... */ },
                          numbers: { "space/md": 16, "radius/sm": 12, /* ... */ } });
await figma.setupTextStyles([
  { name: "display-xl", fontSize: 82, weight: 800, fontFamily: "Space Grotesk" },
  { name: "body", fontSize: 16, weight: 400, fontFamily: "Inter" },
]);
// ...components via findOrCreateComponent / createVariants...

// Snapshot \u2192 save the markdown as design-kit.md (machine-generated, never
// hand-edited). Its header carries a <!-- dsfp:HASH --> fingerprint.
const kit = await figma.generateDesignMd({ depth: 3, includeAnatomy: true, includeScreens: true });
return kit.markdown; // write to design-kit.md; kit.fingerprint.hash is the dsfp
\`\`\`

### B. Draw a screen \u2014 trust the cached kit, but check the fingerprint first
\`\`\`js
// Cheap check: does the live DS still match the cached design-kit.md?
const live = await figma.designFingerprint();           // { hash, counts }
// Compare live.hash to the dsfp: in design-kit.md's header (read from the repo).
// Mismatch \u2192 someone changed the DS in Figma without regenerating; regenerate
// (step A's snapshot) before trusting the file. Match \u2192 draw by NAME:
await figma.create({ type: "FRAME", parentId: page.id, fill: "$color/canvas",
  tokens: { padding: "space/section" } });
await figma.create({ type: "TEXT", parentId: page.id, text: "Hi",
  textStyle: "display-xl", fill: "$color/ink" });
// Names resolve live, so a stale file fails LOUDLY (name miss + candidates),
// never binds the wrong token. Recolouring a token does NOT change the hash;
// adding/removing/renaming one does.
\`\`\`
What generateDesignMd captures and how the fingerprint invalidates: see
\`generateDesignMd\` / \`designFingerprint\` under figma_docs(section="api").

## Clone and edit a descendant
\`\`\`js
const { id, childMap } = await figma.clone(templateCard.id, { parentId: list.id });
await figma.setText(childMap[templateTitleId], "New title");
\`\`\`

## Edit-in-place lifecycle
Editing what already exists (vs. drawing new nodes) follows one loop:
**readSelection \u2192 modify \u2192 layoutAudit**. Read what the user picked, mutate it,
then verify structurally.
\`\`\`js
// 1. read what the user selected (ids, types, bounds, text, fills)
const sel = await figma.readSelection({ detail: "compact", depth: 2 });
if (!sel.nodes.length) return "Select something in Figma first.";
const target = sel.nodes[0];
// 2. modify it (any edit-in-place op below, or figma.modify)
await figma.setEffects(target.id, [
  { type: "DROP_SHADOW", color: "#00000033", offset: { x: 0, y: 4 }, radius: 12, spread: 0 },
]);
// 3. verify structurally (not by eyeballing a screenshot)
const audit = await figma.layoutAudit(target.id);
if (audit.summary.issues.length) console.warn(audit.summary.issues);
\`\`\`

## Format-painter overrides (copy one instance onto many)
\`\`\`js
// Style one instance perfectly, then stamp its overrides onto siblings.
const src = await figma.getInstanceOverrides("12:100"); // inspect first (optional)
await figma.setInstanceOverrides("12:100", ["12:101", "12:102", "12:103"]);
\`\`\`
Source and targets must be instances of the same component.

## Recursive recolor
\`\`\`js
// Rebrand a subtree: swap one blue for another across every fill, incl. strokes.
await figma.setSelectionColors("7:20", { from: "#2563EB", to: "#7C3AED", includeStrokes: true });
// Omit \`from\` to replace ALL solid fills; omit nodeId to use the current selection.
await figma.setSelectionColors(undefined, { to: "#111827" });
\`\`\`

## Gradient paint
\`\`\`js
await figma.setGradient(card.id, {
  type: "LINEAR",
  stops: [
    { position: 0, color: "#2563EB" },
    { position: 1, color: "#7C3AED" },
  ],
  // transform omitted \u2192 default left\u2192right matrix [[1,0,0],[0,1,0]]
});
\`\`\`
\`type\` \u2208 LINEAR | RADIAL | ANGULAR | DIAMOND; needs \u22652 stops. Pass a 2\xD73
\`transform\` matrix to rotate/scale the gradient; \`target: "stroke"\` paints the
stroke instead of the fill.

## Typography ramp + draw by style/token names
Define the type ramp ONCE as text styles, then every text layer references a
style name \u2014 never raw font sizes. Same for colors: bind tokens at create time.
\`\`\`js
// 1. once per file: the ramp (idempotent \u2014 re-running updates in place)
await figma.setupTextStyles([
  { name: "Title 01", fontSize: 40, weight: 700, lineHeight: "120%" },
  { name: "Title 02", fontSize: 30, weight: 700, lineHeight: "120%" },
  { name: "Body",     fontSize: 14, weight: 400, lineHeight: "150%" },
  { name: "Small",    fontSize: 12, weight: 400 },
]);
// 2. drawing: reference by NAME \u2014 style + token, no hardcoded values
const title = await figma.create({
  type: "TEXT", parentId: card.id, text: "Dashboard",
  textStyle: "Title 02", fill: "$text/primary",
});
const surface = await figma.create({
  type: "FRAME", parentId: page.id, layoutMode: "VERTICAL",
  fill: "$surface/card", tokens: { cornerRadius: "radius/md", padding: "space/4" },
});
// 3. retrofit an existing text layer
await figma.setTextStyle(oldTitle.id, "Title 02");
\`\`\`
Unknown token/style names throw with candidates BEFORE creating anything \u2014
a typo cannot silently produce an unstyled node.

## Prototype: wire click \u2192 navigate
Turn static frames into a clickable prototype. \`setReactions\` REPLACES the
node's reactions (like setEffects replaces effects); \`[]\` clears them.
\`\`\`js
// Wire the Login button to the dashboard screen (Smart Animate).
await figma.setReactions(loginBtn.id, [{
  trigger: { type: "ON_CLICK" },
  action: {
    type: "NODE",
    navigation: "NAVIGATE",
    destinationId: dashboardFrame.id,
    transition: { type: "SMART_ANIMATE", easing: { type: "EASE_IN_AND_OUT" }, duration: 0.3 },
  },
}]);
// Omit transition for the same smart-animate default; transition: null = instant.
// Close an overlay/dialog from its Cancel button:
await figma.setReactions(cancelBtn.id, [{ trigger: { type: "ON_CLICK" }, action: { type: "CLOSE" } }]);
\`\`\`
\`destinationId\` must be an existing node (usually a top-level frame) \u2014 a bad
id, trigger, or navigation enum throws INVALID_PARAMS instead of no-op'ing.

## Making it look good (kh\xF4ng ch\u1EC9 \u0111\xFAng c\u1EA5u tr\xFAc)
A "correct" tree can still look unfinished. The palette-first rule and the
transparent-wrapper vs visible-surface distinction live in
figma_docs(section="rules"); the recipes below are the intentional defaults for
the common surfaces. (\`setupTokens\` the agreed palette once, then
\`applyVariable\` instead of re-typing hexes.)

### 1. Full-width button
\`layoutAlign: "STRETCH"\` is what makes the button full-width \u2014 not computing
a pixel width by hand.
\`\`\`js
const button = await figma.create({
  type: "FRAME", name: "Button/Primary", parentId: card.id,
  layoutMode: "HORIZONTAL", layoutAlign: "STRETCH",
  height: 50, cornerRadius: 12,
  fills: [{ type: "SOLID", color: "#2563EB" }],
  primaryAxisAlignItems: "CENTER", counterAxisAlignItems: "CENTER",
  primaryAxisSizingMode: "FIXED", counterAxisSizingMode: "FIXED",
});
await figma.create({
  type: "TEXT", parentId: button.id, characters: "Continue",
  fontSize: 16, fontName: { family: "Inter", style: "Semi Bold" },
  fills: [{ type: "SOLID", color: "#FFFFFF" }],
});
\`\`\`

### 2. Card
Background fill + radius + even padding + gap between children, not manual
child offsets.
\`\`\`js
const card = await figma.create({
  type: "FRAME", name: "Card", parentId: screen.id,
  layoutMode: "VERTICAL", layoutAlign: "STRETCH",
  primaryAxisSizingMode: "AUTO", counterAxisSizingMode: "FIXED",
  paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20,
  itemSpacing: 12,
  fills: [{ type: "SOLID", color: "#FFFFFF" }],
  strokes: [{ type: "SOLID", color: "#E5E7EB" }], strokeWeight: 1,
  cornerRadius: 16,
});
// children of card use layoutAlign:"STRETCH" to fill its width
\`\`\`

### 3. Input field
Label above a bordered box, not a bare text node floating over a rectangle.
\`\`\`js
const field = await figma.create({
  type: "FRAME", name: "Field/Email", parentId: card.id,
  layoutMode: "VERTICAL", layoutAlign: "STRETCH", itemSpacing: 6,
  primaryAxisSizingMode: "AUTO", counterAxisSizingMode: "FIXED",
});
await figma.create({
  type: "TEXT", parentId: field.id, characters: "Email",
  fontSize: 13, fills: [{ type: "SOLID", color: "#6B7280" }],
});
const box = await figma.create({
  type: "FRAME", parentId: field.id, layoutAlign: "STRETCH",
  layoutMode: "HORIZONTAL", counterAxisAlignItems: "CENTER",
  height: 48, paddingLeft: 14, paddingRight: 14,
  fills: [{ type: "SOLID", color: "#F9FAFB" }],
  strokes: [{ type: "SOLID", color: "#E5E7EB" }], strokeWeight: 1,
  cornerRadius: 10,
});
await figma.create({
  type: "TEXT", parentId: box.id, characters: "you@example.com",
  fontSize: 15, fills: [{ type: "SOLID", color: "#9CA3AF" }],
});
\`\`\`

### 4. Vertical stack with gaps
Use \`itemSpacing\` on the auto-layout parent. Anti-pattern: an empty 1px
"Spacer" FRAME between siblings \u2014 it's fragile and invisible in the tree's
intent. Set the gap once on the parent instead.
\`\`\`js
await figma.create({
  type: "FRAME", name: "Form", parentId: screen.id,
  layoutMode: "VERTICAL", layoutAlign: "STRETCH", itemSpacing: 16,
}); // fieldA, fieldB, button all get 16px apart automatically -- no spacers
\`\`\`

### 5. Text hierarchy
Always set a color and size explicitly \u2014 never leave text at its default
black/12px. Heading and body should read as different weights of importance.
\`\`\`js
await figma.create({
  type: "TEXT", parentId: screen.id, characters: "Welcome back",
  fontSize: 26, fontName: { family: "Inter", style: "Bold" },
  fills: [{ type: "SOLID", color: "#111827" }],
  // To CENTER a title/link/label, set textAlignHorizontal (aligns the glyphs in
  // the text box) AND give the box a width via layoutAlign:"STRETCH". Do NOT use
  // \`align\` for this \u2014 \`align\` moves the whole node, not its text content.
  layoutAlign: "STRETCH", textAlignHorizontal: "CENTER",
});
await figma.create({
  type: "TEXT", parentId: screen.id, characters: "Sign in to continue", wrap: true,
  fontSize: 15, fills: [{ type: "SOLID", color: "#6B7280" }],
});
\`\`\`

### Checklist tr\u01B0\u1EDBc khi b\xE1o xong
- M\u1ECDi frame n\u1ED9i dung (card, button, field, header\u2026) c\xF3 \`fills\` n\u1EC1n/m\xE0u, kh\xF4ng
  c\xF2n frame tr\u1EA7n trong su\u1ED1t?
- N\xFAt v\xE0 input field \u0111\xE3 \`layoutAlign:"STRETCH"\` \u0111\u1EC3 full-width, kh\xF4ng ph\u1EA3i
  width c\u1ED1 \u0111\u1ECBnh \u0111o\xE1n m\xF2?
- Kho\u1EA3ng c\xE1ch gi\u1EEFa c\xE1c ph\u1EA7n t\u1EED d\xF9ng \`itemSpacing\` (gap), kh\xF4ng ph\u1EA3i spacer
  frame 1px?
- M\u1ECDi \`TEXT\` \u0111\xE3 set \`fills\` (m\xE0u ch\u1EEF) v\xE0 \`fontSize\` ph\xF9 h\u1EE3p vai tr\xF2
  (heading/body/label), kh\xF4ng \u0111\u1EC3 m\u1EB7c \u0111\u1ECBnh?
- \u0110\xE3 h\u1ECFi user v\u1EC1 palette/design tokens, ho\u1EB7c t\xE1i d\xF9ng \`design.md\`/token c\xF3
  s\u1EB5n, tr\u01B0\u1EDBc khi v\u1EBD m\xE0u?
- \`layoutAudit\` s\u1EA1ch (kh\xF4ng overflow/clip/truncate) -- nh\u01B0ng nh\u1EDB \u0111\xF3 ch\u1EC9 l\xE0
  ki\u1EC3m tra k\u1EF9 thu\u1EADt, kh\xF4ng ph\u1EA3i ki\u1EC3m tra th\u1EA9m m\u1EF9.
- Ch\u1EC9 ch\u1EE5p m\u1ED9t screenshot cu\u1ED1i c\xF9ng cho human sau khi m\u1ECDi th\u1EE9 \u1EDF tr\xEAn \u0111\xE3 \u1ED5n
  -- m\u1ED7i screenshot t\u1ED1n kho\u1EA3ng 6-15K token, \u0111\u1EEBng ch\u1EE5p l\u1EB7p l\u1EA1i \u0111\u1EC3 "xem th\u1EED".
`;var je=`# Default taste \u2014 v\u1EBD cho \u0111\u1EB9p khi CH\u01AFA c\xF3 design.md

\u0110\xE2y l\xE0 b\u1ED9 gu M\u1EB6C \u0110\u1ECANH, ch\u1EC9 d\xF9ng khi file Figma ch\u01B0a c\xF3 design system V\xC0 codebase
kh\xF4ng c\xF3 \`design.md\`. N\u1EBFu c\xF3 \`design.md\` ho\u1EB7c file \u0111\xE3 c\xF3 tokens/styles/components,
B\u1ECE QUA ph\u1EA7n n\xE0y \u2014 intent c\u1EE7a user lu\xF4n th\u1EAFng. B\u1ED9 d\u01B0\u1EDBi \u0111\xE2y brand-neutral: \u0111\u1ED5i \u0111\xFAng
M\u1ED8T bi\u1EBFn \`color/primary\` l\xE0 ra brand kh\xE1c, ph\u1EA7n c\xF2n l\u1EA1i gi\u1EEF nguy\xEAn v\u1EABn \u0111\u1EB9p.

Tr\xEDch t\u1EEB Tailwind / Radix / Material 3 / Apple HIG. \u0110\xE2y l\xE0 \u0111i\u1EC3m KH\u1EDEI \u0110\u1EA6U t\u1EED t\u1EBF,
kh\xF4ng ph\u1EA3i lu\u1EADt c\u1EE9ng \u2014 user s\u1EEDa tho\u1EA3i m\xE1i.

---

## V\xEC sao b\u1EA3n v\u1EBD tr\xF4ng "\u0111\u01A1" (v\xE0 c\xE1ch ch\u1EEFa)

"\u0110\u01A1" = k\u1EF9 thu\u1EADt \u0111\xFAng nh\u01B0ng v\xF4 h\u1ED3n. B\u1EA3y nguy\xEAn nh\xE2n, x\u1EBFp theo m\u1EE9c s\xE1t th\u01B0\u01A1ng:

1. **Ph\u1EB3ng l\xEC \u2014 kh\xF4ng c\xF3 \u0111\u1ED9 s\xE2u.** M\u1ECDi surface c\xF9ng m\u1ED9t m\u1EB7t ph\u1EB3ng, kh\xF4ng shadow,
   kh\xF4ng ph\xE2n t\u1EA7ng. \u2192 Card/popover/button n\u1ED5i ph\u1EA3i c\xF3 elevation (m\u1EE5c Elevation).
   N\u1EC1n trang, card, v\xE0 control ph\u1EA3i \u1EDF 3 \u0111\u1ED9 s\xE1ng kh\xE1c nhau, kh\xF4ng c\xF9ng m\u1ED9t m\xE0u.
2. **M\u1ECDi th\u1EE9 c\xF9ng m\u1ED9t "gi\u1ECDng".** Heading, body, label c\xF9ng weight/m\xE0u \u2192 m\u1EAFt kh\xF4ng
   bi\u1EBFt nh\xECn \u0111\xE2u tr\u01B0\u1EDBc. \u2192 Ph\xE2n c\u1EA5p b\u1EB1ng BA k\xEAnh c\xF9ng l\xFAc: **size + weight + m\xE0u**
   (m\u1EE5c Type + Color). \u0110\u1EEBng ch\u1EC9 \u0111\u1ED5i m\u1ED7i size.
3. **Spacing \u0111\u1EC1u t\u0103m t\u1EAFp \u2192 kh\xF4ng c\xF3 nh\xF3m.** N\u1EBFu m\u1ECDi \`itemSpacing\` b\u1EB1ng nhau, kh\xF4ng
   g\xEC "thu\u1ED9c v\u1EC1 nhau". \u2192 **Kho\u1EA3ng c\xE1ch TRONG nh\xF3m < kho\u1EA3ng c\xE1ch GI\u1EEEA c\xE1c nh\xF3m.**
   Label s\xE1t input n\xF3 m\xF4 t\u1EA3 (8px), nh\u01B0ng c\xE1c field c\xE1ch nhau xa h\u01A1n (16\u201324px).
4. **Ch\u1EADt ch\u1ED9i ho\u1EB7c d\xE0n \u0111\u1EC1u v\xF4 h\u1ED3n.** \u2192 B\u1EAFt \u0111\u1EA7u b\u1EB1ng TH\u1EEAA white space r\u1ED3i b\u1EDBt d\u1EA7n.
   Section l\u1EDBn d\xF9ng gap cao (48/64), kh\xF4ng ph\u1EA3i 16 kh\u1EAFp n\u01A1i.
5. **M\xE0u ch\u1EBFt.** \`#000\`/\`#FFF\` thu\u1EA7n v\xE0 x\xE1m v\xF4 s\u1EAFc \`#808080\` l\xE0m UI tr\xF4ng r\u1EBB v\xE0
   m\u1ECFi m\u1EAFt. \u2192 off-black/off-white + x\xE1m \xC1M nh\u1EB9 theo hue primary (m\u1EE5c Color).
6. **Line-height m\u1ED9t c\u1EE1 cho t\u1EA5t c\u1EA3.** Heading 32px m\xE0 line-height 1.5 th\xEC tr\xF4ng
   r\u1EDDi r\u1EA1c. \u2192 line-height GI\u1EA2M khi c\u1EE1 ch\u1EEF T\u0102NG (m\u1EE5c Type).
7. **Canh gi\u1EEFa t\u1EA5t c\u1EA3.** M\u1ECDi th\u1EE9 c\u0103n gi\u1EEFa \u2192 kh\xF4ng c\xF3 m\u1ECF neo th\u1ECB gi\xE1c. \u2192 N\u1ED9i dung
   \u0111\u1ECDc (text, form) c\u0103n TR\xC1I; ch\u1EC9 c\u0103n gi\u1EEFa hero/empty-state/dialog ng\u1EAFn.

Lu\u1EADt v\xE0ng: **m\u1ECDi gi\xE1 tr\u1ECB l\u1EA5y t\u1EEB m\u1ED9t THANG h\u1EEFu h\u1EA1n b\xEAn d\u01B0\u1EDBi, kh\xF4ng b\u1ECBa s\u1ED1 l\u1EBB.**
\u0110\u1EAFn \u0111o 13 hay 15px ngh\u0129a l\xE0 \u0111ang l\xE0m sai \u2014 thang ch\u1EC9 cho ch\u1ECDn 12 ho\u1EB7c 14 ho\u1EB7c 16.

---

## Type \u2014 thang ch\u1EEF (font: Inter, ho\u1EB7c Space Grotesk cho heading n\u1EBFu mu\u1ED1n n\xE9t h\u01A1n)

Line-height GI\u1EA2M D\u1EA6N khi size t\u0103ng. \u0110\xE2y l\xE0 th\u1EE9 hay b\u1ECB sai nh\u1EA5t.

| Vai tr\xF2        | size | line-height | weight | letter-spacing |
|----------------|------|-------------|--------|----------------|
| display        | 48   | 52 (1.08)   | 700    | -0.02em        |
| title          | 32   | 38 (1.2)    | 700    | -0.01em        |
| heading        | 24   | 30 (1.25)   | 600    | -0.005em       |
| subheading     | 20   | 28 (1.4)    | 600    | 0              |
| body-lg        | 18   | 28 (1.55)   | 400    | 0              |
| body           | 16   | 24 (1.5)    | 400    | 0              |
| label          | 14   | 20 (1.43)   | 500    | 0              |
| caption        | 12   | 16 (1.33)   | 400    | +0.0025em      |

\`\`\`js
await figma.setupTextStyles([
  { name: "display",    fontSize: 48, weight: 700, lineHeight: 52, letterSpacing: "-2%",   fontFamily: "Inter" },
  { name: "title",      fontSize: 32, weight: 700, lineHeight: 38, letterSpacing: "-1%",   fontFamily: "Inter" },
  { name: "heading",    fontSize: 24, weight: 600, lineHeight: 30, letterSpacing: "-0.5%", fontFamily: "Inter" },
  { name: "subheading", fontSize: 20, weight: 600, lineHeight: 28, fontFamily: "Inter" },
  { name: "body-lg",    fontSize: 18, weight: 400, lineHeight: 28, fontFamily: "Inter" },
  { name: "body",       fontSize: 16, weight: 400, lineHeight: 24, fontFamily: "Inter" },
  { name: "label",      fontSize: 14, weight: 500, lineHeight: 20, fontFamily: "Inter" },
  { name: "caption",    fontSize: 12, weight: 400, lineHeight: 16, letterSpacing: "0.25%", fontFamily: "Inter" },
]);
\`\`\`
R\u1ED3i v\u1EBD b\u1EB1ng \`textStyle: "heading"\` \u2014 KH\xD4NG bao gi\u1EDD hardcode \`fontSize\` r\u1EDDi r\u1EA1c.
Quy t\u1EAFc: m\u1ED9t m\xE0n h\xECnh d\xF9ng 3\u20134 style l\xE0 \u0111\u1EE7; \u0111\u1EEBng d\xF9ng c\u1EA3 8.

## Spacing \u2014 l\u01B0\u1EDBi 4px (m\u1ECDi gap/padding l\u1EA5y t\u1EEB \u0111\xE2y)

\`2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96\` \u2014 tr\xEAn 24 th\xEC nh\u1EA3y b\u1EADc \u0111\u1EC3 c\xE1c m\u1EE9c
c\xF2n ph\xE2n bi\u1EC7t \u0111\u01B0\u1EE3c. Nh\u1EDB: **trong nh\xF3m < gi\u1EEFa nh\xF3m.**

\`\`\`js
await figma.setupTokens({ numbers: {
  "space/2": 2, "space/1": 4, "space/2x": 8, "space/3": 12, "space/4": 16,
  "space/6": 24, "space/8": 32, "space/10": 40, "space/12": 48, "space/16": 64,
}});
\`\`\`
G\u1EE3i \xFD: padding card 24, gap gi\u1EEFa c\xE1c field 16, gap label\u2194input 8, gap gi\u1EEFa c\xE1c
section 48\u201364. N\xFAt/input cao 44\u201348 (44 l\xE0 tap-target t\u1ED1i thi\u1EC3u c\u1EE7a Apple).

## Radius \u2014 bo g\xF3c

\`4, 8, 12, 16, 9999(pill)\`. Input/button nh\u1ECF d\xF9ng 8\u201310; card d\xF9ng 12\u201316; pill
d\xF9ng 9999. **Corner smoothing 60%** (\`cornerSmoothing: 0.6\`) cho c\u1EA3m gi\xE1c iOS m\u01B0\u1EE3t.

Lu\u1EADt L\u1ED2NG NHAU (r\u1EA5t hay b\u1ECB sai, l\xE0m g\xF3c tr\xF4ng "ph\xECnh"):
\`\`\`
radius_ngo\xE0i = radius_trong + padding
\`\`\`
Icon bo 8 n\u1EB1m trong padding 8 \u2192 n\xFAt b\u1ECDc ngo\xE0i bo 16, kh\xF4ng ph\u1EA3i c\u0169ng 8.

\`\`\`js
await figma.setupTokens({ numbers: {
  "radius/sm": 8, "radius/md": 12, "radius/lg": 16, "radius/pill": 9999,
}});
\`\`\`

## Color \u2014 off-black/off-white + x\xE1m \xC1M theo primary

KH\xD4NG \`#000\`/\`#FFF\` thu\u1EA7n. KH\xD4NG x\xE1m v\xF4 s\u1EAFc. Palette d\u01B0\u1EDBi trung t\xEDnh-m\xE1t; \u0111\u1ED5i
\`color/primary\` sang brand c\u1EE7a b\u1EA1n l\xE0 xong.

\`\`\`js
await figma.setupTokens({ colors: {
  "color/canvas":     "#FCFCFD",  // n\u1EC1n trang (off-white)
  "color/surface":    "#FFFFFF",  // card/panel \u2014 s\xE1ng h\u01A1n canvas 1 b\u1EADc
  "color/surface-2":  "#F4F4F6",  // n\u1EC1n l\u1ED3ng / hovered
  "color/ink":        "#1C2024",  // text ch\xEDnh (off-black, KH\xD4NG #000)
  "color/ink-muted":  "#60646C",  // text ph\u1EE5 (x\xE1m \xE1m l\u1EA1nh, \u0111\u1ECDc \u0111\u01B0\u1EE3c: ~5.8:1)
  "color/ink-subtle": "#8B8D98",  // text m\u1EDD nh\u1EA5t \u2014 ch\u1EC9 caption/placeholder
  "color/border":     "#E2E8F0",  // hairline; ho\u1EB7c d\xF9ng \u0111en 8% cho \u0111a n\u1EC1n
  "color/primary":    "#2563EB",  // << \u0110\u1ED4I SANG BRAND. Ph\u1EA7n c\xF2n l\u1EA1i gi\u1EEF nguy\xEAn.
  "color/on-primary": "#FFFFFF",
  "color/success":    "#16A34A",
  "color/danger":     "#DC2626",
}});
\`\`\`
Ba b\u1EADc text (ink / ink-muted / ink-subtle) l\xE0 th\u1EE9 t\u1EA1o ph\xE2n c\u1EA5p m\xE0 kh\xF4ng c\u1EA7n \u0111\u1ED5i
size. X\xE1m ph\u1EA3i \xE1m c\xF9ng ph\xEDa hue v\u1EDBi primary (primary l\u1EA1nh \u2192 x\xE1m h\u01A1i xanh; primary
\u1EA5m \u2192 x\xE1m h\u01A1i n\xE2u) \u2014 x\xE1m v\xF4 s\u1EAFc c\u1EA1nh m\xE0u b\xE3o h\xF2a s\u1EBD tr\xF4ng "ch\u1EBFt".

Contrast: text th\u01B0\u1EDDng c\u1EA7n \u2265 4.5:1, text l\u1EDBn/UI \u2265 3:1. KH\xD4NG bao gi\u1EDD ch\u1EEF x\xE1m tr\xEAn
n\u1EC1n m\xE0u \u2014 d\xF9ng m\u1ED9t bi\u1EBFn th\u1EC3 c\xF9ng hue, s\xE1ng/t\u1ED1i h\u01A1n.

## Elevation \u2014 th\u1EE9 ch\u1EEFa "ph\u1EB3ng l\xEC" nhanh nh\u1EA5t

\u0110\u1EEBng d\xF9ng shadow m\u1ED9t-l\u1EDBp \u0111en-\u0111\u1EADm m\u1EB7c \u0111\u1ECBnh. D\xF9ng \u0110A L\u1EDAP, alpha th\u1EA5p, \xE1m nh\u1EB9,
C\xD9NG m\u1ED9t ngu\u1ED3n s\xE1ng (offset y d\u01B0\u01A1ng, x=0). \u0110\u1ECBnh ngh\u0129a M\u1ED8T L\u1EA6N th\xE0nh effect
style (token h\xF3a elevation), r\u1ED3i t\xE1i d\xF9ng theo t\xEAn \u2014 \u0111\u1EEBng l\u1EB7p l\u1EA1i inline.

\`\`\`js
// \u0111\u1ECBnh ngh\u0129a ramp elevation m\u1ED9t l\u1EA7n (idempotent, upsert theo t\xEAn)
await figma.setupEffectStyles([
  { name: "elevation/card", effects: [
    { type: "DROP_SHADOW", color: "#1C202412", offset: { x: 0, y: 1 }, radius: 2,  spread: 0 },
    { type: "DROP_SHADOW", color: "#1C20240F", offset: { x: 0, y: 4 }, radius: 12, spread: -2 },
  ]},
  { name: "elevation/overlay", effects: [
    { type: "DROP_SHADOW", color: "#1C20241A", offset: { x: 0, y: 8 }, radius: 24, spread: -6 },
    { type: "DROP_SHADOW", color: "#1C20240D", offset: { x: 0, y: 2 }, radius: 6,  spread: -2 },
  ]},
]);
// r\u1ED3i \xE1p: card d\xF9ng elevation/card, popover/modal d\xF9ng elevation/overlay.
// (setEffects v\u1EDBi c\xE1c effect y h\u1EC7t c\u0169ng \u0111\u01B0\u1EE3c, nh\u01B0ng token h\xF3a th\xEC nh\u1EA5t qu\xE1n h\u01A1n.)
\`\`\`
Ba m\u1EE9c l\xE0 \u0111\u1EE7: ph\u1EB3ng (0, ch\u1EC9 hairline border) \u2192 card \u2192 overlay. Elevation c\xE0ng
cao th\xEC blur c\xE0ng r\u1ED9ng, opacity m\u1ED7i l\u1EDBp c\xE0ng TH\u1EA4P. M\xE0u shadow \xE1m theo ink
(\`#1C2024xx\`), KH\xD4NG ph\u1EA3i \`#000000\`. N\u1EBFu g\u1ECDi \`setEffects\` m\xE0 b\u1ECF tr\u1ED1ng m\xE0u/
offset/radius, m\u1EB7c \u0111\u1ECBnh gi\u1EDD \u0111\xE3 l\xE0 shadow m\u1EC1m hi\u1EC7n \u0111\u1EA1i (ink 10%, y4, blur12),
kh\xF4ng c\xF2n l\xE0 \u0111en-\u0111\u1EADm 25%.

Khi n\xE0o shadow vs border: card tr\xEAn n\u1EC1n ph\u1EB3ng \u2192 shadow nh\u1EB9. Ph\u1EA7n t\u1EED trong list/
table \u2192 ch\u1EC9 border, \u0111\u1EEBng shadow (nhi\u1EC1u shadow c\u1EA1nh nhau th\xE0nh "\u0111\u1EE5c").

## Ch\u1ED1t nhanh \u2014 checklist ch\u1ED1ng-\u0111\u01A1 tr\u01B0\u1EDBc khi b\xE1o xong

- [ ] 3 \u0111\u1ED9 s\xE1ng surface kh\xE1c nhau (canvas / surface / surface-2)? Kh\xF4ng ph\u1EB3ng l\xEC?
- [ ] Ph\xE2n c\u1EA5p text d\xF9ng c\u1EA3 size + weight + m\xE0u, kh\xF4ng ch\u1EC9 m\u1ED9t k\xEAnh?
- [ ] Spacing TRONG nh\xF3m nh\u1ECF h\u01A1n GI\u1EEEA nh\xF3m? (label s\xE1t input, field c\xE1ch nhau xa)
- [ ] M\u1ECDi s\u1ED1 l\u1EA5y t\u1EEB thang (4px grid, type scale)? Kh\xF4ng c\xF3 13/15/17/50?
- [ ] Text \u0111\u1ECDc c\u0103n TR\xC1I, kh\xF4ng ph\u1EA3i c\u0103n gi\u1EEFa m\u1ECDi th\u1EE9?
- [ ] Card/n\xFAt n\u1ED5i c\xF3 elevation \u0111a-l\u1EDBp \xE1m nh\u1EB9, kh\xF4ng ph\u1EA3i shadow \u0111en m\u1ED9t-l\u1EDBp?
- [ ] Kh\xF4ng \`#000\`/\`#FFF\` thu\u1EA7n; x\xE1m \xE1m theo hue primary?
- [ ] line-height c\u1EE7a heading ch\u1EB7t h\u01A1n body (1.1\u20131.25 vs 1.5)?
`;var Be={rules:Ce,layout:Pe,api:Le,tokens:Me,icons:Fe,recipes:De,style:je},B=Object.keys(Be);function He(n){let t=Be[n];return t||`# Unknown docs section "${n}"

Available sections: ${B.join(", ")}.
`}async function Ue(n){let t=await n.diagnostics(),e=t.plugin?t.plugin.protocolVersion===3:null,r=Ft(t,e);return{pluginConnected:t.pluginConnected,statusSource:t.statusSource,...t.statusError?{statusError:t.statusError}:{},mode:t.mode,port:t.port,serverVersion:O,protocolVersion:3,bridgeAuth:t.bridgeAuth,plugin:t.plugin?{version:t.plugin.version,apiVersionMatch:e,fileName:t.plugin.fileName,pageName:t.plugin.pageName,editorType:t.plugin.editorType}:null,channels:t.channels===void 0?null:t.channels.map(o=>({channel:o.channel,fileName:o.plugin.fileName,pageName:o.plugin.pageName,queueLength:o.queueLength,lastHeartbeatMs:o.lastHeartbeatMs,...o.boundSessions?.length?{boundSessions:o.boundSessions}:{}})),lastHeartbeatMs:t.lastHeartbeatMs,queueLength:t.queueLength,pendingCount:t.pendingCount,sessions:n.sessions.summaries(),...t.defaultSessionId?{mySessionId:t.defaultSessionId}:{},...t.boundChannel?{myBoundChannel:t.boundChannel}:{},hints:r}}function Ft(n,t){let e=[];return n.mode==="follower"&&e.push("This process is a FOLLOWER; operations forward to the leader over /rpc. This is normal with multiple IDE windows."+(n.statusSource==="leader"?" Plugin state below was read from the leader and is live.":"")),n.bridgeAuth==="missing"&&e.push("Bridge auth token is missing \u2014 the discovery file (leader-<port>.json) was not written or is unreadable. Restart the server."),n.pluginConnected===null?e.push(`Plugin connection is UNKNOWN \u2014 this follower could not query the leader for status${n.statusError?` (${n.statusError})`:""}. This does NOT mean the plugin is disconnected; do not ask the user to restart it on this basis. Ops still forward to the leader \u2014 try figma_read {op:"list_channels"}, and only if that fails treat the bridge as down.`):n.pluginConnected?((n.channels?.length??0)>1&&!n.boundChannel&&e.push(`${n.channels?.length} Figma windows are connected. Pass channel in figma_write/figma_read (see channels above or figma_read {op:"list_channels"}), or ask the user to pick this session (${n.defaultSessionId??"?"}) in the plugin UI of the window they want.`),n.boundChannel&&e.push(`This session is bound to channel "${n.boundChannel}" (picked by the user in the plugin UI) \u2014 operations route there by default.`),t===!1&&e.push(`Plugin protocol v${n.plugin?.protocolVersion} \u2260 server v${3} \u2014 reinstall the plugin from plugin/manifest.json.`),n.lastHeartbeatMs!==null&&n.lastHeartbeatMs>=0&&n.lastHeartbeatMs>V&&e.push(`No heartbeat for ${Math.round(n.lastHeartbeatMs/1e3)}s \u2014 the Figma window may be minimized or the machine asleep.`),n.queueLength>0&&e.push(`${n.queueLength} operation(s) queued \u2014 the plugin is busy; batch related ops to reduce round-trips.`)):e.push("No Figma plugin connected. Open Figma Desktop \u2192 Plugins \u2192 Reqwise, and keep the plugin window open."),e.length===0&&e.push("All systems nominal. Draw with figma_write; verify with figma_read layout_audit."),e}async function Ve(n,t,e,r){if(!Y(t))throw new g("INVALID_PARAMS",`"${t}" is not a read operation.`,'Use figma_write for mutations. Read ops: see figma_docs(section="api").');return n.runValidated(t,e,void 0,r)}async function qe(n,t,e,r){if(typeof t!="string"||t.trim().length===0)throw new g("INVALID_PARAMS","figma_write requires non-empty `code`.","Pass JavaScript that uses the figma.* proxy, e.g. await figma.create({type:'FRAME'}).");return n.runWrite(t,e,r)}async function ze(n,t){let[e,r,o]=await Promise.allSettled([n.runValidated("get_styles",{},void 0,t),n.runValidated("get_variables",{},void 0,t),n.runValidated("get_components",{},void 0,t)]),s=["# Design-system rule sheet",""],u=ce(e,Dt),a=ce(r,jt),c=ce(o,Ht);s.push("## Styles"),s.push(u),s.push(""),s.push("## Variables"),s.push(a),s.push(""),s.push("## Components"),s.push(c),s.push("");let l=p=>p==="_none_";return l(u)&&l(a)&&l(c)&&(s.push("## No design system in this file \u2014 set one up BEFORE drawing"),s.push(["There are no styles, variables or components to reuse. Do NOT silently invent values \u2014 that is what makes AI-drawn UI look generic and lifeless (arbitrary font sizes, flat surfaces, dead greys, one harsh shadow). Instead:","1. If the codebase has a `design.md` (or the user gave brand/type/spacing earlier), use THOSE values \u2014 they always win.",'2. Otherwise DON\'T guess. Read `figma_docs(section="style")` \u2014 a ready default type scale, 4px spacing grid, tinted palette and layered-elevation ramp, plus the anti-lifeless rules (hierarchy via size+weight+color, in-group < between-group spacing, no #000/#FFF, line-height that shrinks as size grows). It is brand-neutral: change one `color/primary` and the rest still looks right.',"3. Apply it once (setupTokens + setupTextStyles from that section), confirm the primary color with the user, then draw by NAME (`textStyle:`, `$color/...`, `tokens:`) \u2014 never re-hardcode.","4. After the first screens exist, `figma.generateDesignMd()` produces a `design.md` to save for future sessions."].join(`
`)),s.push("")),s.push("> Reuse the above before creating new nodes: figma.applyVariable for colors/numbers, figma.findOrCreateComponent for components."),s.push('> Drawing a multi-screen flow (login/signup, onboarding, checkout\u2026)? The screen list is almost always underspecified. Ask the user first: exact screens & order, the states each needs (empty/loading/error/success), entry variations (social/SSO/OTP/verify-email), platform & frame size, light/dark. One round of questions now beats redrawing every screen. See figma_docs(section="rules") \u2192 "Scope a flow before drawing it".'),s.join(`
`)}function ce(n,t){if(n.status==="rejected"){let e=n.reason;return`_Could not load: ${e instanceof g?`${e.message}${e.hint?` (${e.hint})`:""}`:String(e)}_`}try{return t(n.value)}catch{return"_none_"}}function Dt(n){let t=n;if(Array.isArray(t))return t.length?t.map(r=>`- ${X(r)}`).join(`
`):"_none_";let e=[];for(let r of["paint","text","effect"]){let o=t?.[r];Array.isArray(o)&&o.length&&e.push(`**${r}**: ${o.map(X).join(", ")}`)}return e.length?e.join(`

`):"_none_"}function jt(n){let t=n?.collections;return!Array.isArray(t)||t.length===0?Array.isArray(n)&&n.length?n.map(e=>`- ${X(e)}`).join(`
`):"_none_":t.map(e=>{let r=Array.isArray(e.modes)?e.modes.map(a=>a?.name).filter(Boolean):[],o=r.length?r.join(", "):"default",s=Array.isArray(e.variables)?e.variables:[];if(s.length===0)return`- **${e.name??"collection"}** (modes: ${o}): _no variables_`;let u=s.map(a=>{let c=Bt(a,r[0]);return c!==void 0?`  - ${a.name??"?"}: ${c}`:`  - ${a.name??"?"}`});return`- **${e.name??"collection"}** (modes: ${o}):
${u.join(`
`)}`}).join(`
`)}function Bt(n,t){let e=n.values;if(!e||typeof e!="object")return;let r=t&&t in e?t:Object.keys(e)[0];if(r===void 0)return;let o=e[r];if(o!=null){if(typeof o=="object"){let s=o.alias;return s?`\u2192 ${String(s)}`:JSON.stringify(o)}return String(o)}}function Ht(n){let t=Array.isArray(n)?n:n?.components;return!Array.isArray(t)||t.length===0?"_none_":t.map(e=>`- ${X(e)}`).join(`
`)}function X(n){if(typeof n=="string")return n;if(n&&typeof n=="object"){let t=n;return String(t.name??t.key??t.id??JSON.stringify(t))}return String(n)}function $e(n){return n?He(n):`# figma_docs

Available sections: ${B.join(", ")}.
Call figma_docs({ section: "api" }) etc.`}var Wt=[{name:"figma_status",description:"Rich connection diagnostics for the Figma bridge (never a bare boolean): plugin connection, leader/follower mode, port, heartbeat, queue, sessions, and an ordered list of concrete next-step hints when something is off. `pluginConnected` is TRI-STATE: true/false are measured, null means UNKNOWN (this follower could not query the leader \u2014 see `statusSource`/`statusError`). Do NOT treat null as disconnected and do NOT ask the user to reopen the plugin on that basis; ops may still be forwarding fine.",inputSchema:{type:"object",properties:{},additionalProperties:!1}},{name:"figma_read",description:"Read the Figma canvas with a token-frugal response. Choose an operation and pass its params. layout_audit is the structured verify tool: blocking issues cover bounds/clipping/truncation, while styleHints flag tight padding, inconsistent radius and low contrast. read_selection deep-reads the current selection in one call \u2014 the entry point of the selection-first edit-in-place lifecycle (read_selection \u2192 figma_write modify \u2192 layout_audit).",inputSchema:{type:"object",properties:{op:{type:"string",enum:[...C,"list_channels"],description:"The read operation to run. list_channels lists connected Figma windows (channel, file, page) \u2014 needed only when several windows are open."},params:{type:"object",description:"Operation parameters (e.g. { nodeId }, { nodeIds }, { detail: 'sparse'|'compact'|'full' }, read_selection: { detail?, depth? }).",additionalProperties:!0},channel:{type:"string",description:"Target Figma window's channel. Omit with a single window (auto-routes). With several windows, pick one from list_channels."}},required:["op"],additionalProperties:!1}},{name:"figma_write",description:'Execute modern-ES JavaScript in a sandbox against the figma.* proxy to draw/modify the canvas. NOT the official Figma Plugin API \u2014 read figma_docs(section="api") before first use. Key rules: FRAME/COMPONENT without fill/fills is transparent (structural wrapper); visible cards/controls need an explicit fill, design-system radius and 12\u201324px padding. create() takes ONE spec object with parentId INSIDE it (omitting parentId drops the node at page level). Colors are "#rrggbb" or {r,g,b} 0..1. `state` persists across calls. Banned: require/process/fetch/timers/eval. Returns { ok, result, logs, warnings }.',inputSchema:{type:"object",properties:{code:{type:"string",description:"JavaScript body. Use await figma.create({...}), figma.batch([...]), figma.layoutAudit(id), etc. Return a value to receive it as `result`."},sessionId:{type:"string",description:"Optional session key. Omit for this MCP connection's own private session (each Claude Code / Codex instance gets isolated `state` automatically). Pass an explicit shared key only to deliberately share state across agents."},channel:{type:"string",description:"Target Figma window's channel. Omit with a single window (auto-routes). With several windows, pick one from figma_read list_channels."}},required:["code"],additionalProperties:!1}},{name:"figma_rules",description:"One-call design-system rule sheet as markdown: styles + variables + components, fetched in parallel. Read before drawing so you reuse tokens/components instead of hardcoding.",inputSchema:{type:"object",properties:{channel:{type:"string",description:"Target Figma window's channel; omit with a single window."}},additionalProperties:!1}},{name:"figma_docs",description:"On-demand documentation for this API and its safe-by-default rules. Sections: rules | layout | api | tokens | icons | recipes | style. Read `style` when drawing a screen with NO design.md / no existing design system \u2014 it is the default type scale, spacing grid, color palette and elevation to fall back on instead of inventing values (which reads as generic/lifeless).",inputSchema:{type:"object",properties:{section:{type:"string",enum:[...B],description:"Which doc section to return."}},required:["section"],additionalProperties:!1}}];function Gt(n=process.env,t=e=>process.stderr.write(e)){let e=n.FIGMA_MCP_PORT;if(e===void 0||e.trim()==="")return 38470;let r=Number(e);if(!Number.isInteger(r)||r<1||r>65535)throw new Error(`FIGMA_MCP_PORT must be an integer between 1 and 65535 (got "${e}").`);if(r<1024)throw new Error(`FIGMA_MCP_PORT=${r} is a privileged port (<1024). Use 1024\u201365535, ideally ${38470}.`);return(r<38470||r>38479)&&t(`[reqwise-figma-mcp] warning: FIGMA_MCP_PORT=${r} is outside the range the Figma plugin scans (${38470}-${38479}). The server will bind it, but the plugin cannot discover it and will never connect. Use a port in that range unless you are proxying.
`),r}async function Jt(){let n=new z,t=`s-${Ut().slice(0,8)}`,e=d=>d&&d.length>0?d:t,r=()=>o.bridge,o=new J({startPort:Gt(),runValidated:async(d,h,y,m)=>{if(d==="__register__")return y&&n.get(y),{registered:!0};if(d==="__status__"){let T=r();if(!T)throw new g("NOT_CONNECTED","Bridge unavailable on leader.","Restart the leader.");return c(T)}if(d==="__write__"){let T=typeof h.code=="string"?h.code:"";return ae(T,n.get(y),{runOp:async(H,K)=>{let{op:R,params:Ge}=E(H,K),Q=r();if(!Q)throw new g("NOT_CONNECTED","Bridge unavailable.","Restart the leader.");return R==="list_channels"?{id:"server",ok:!0,result:Q.channelSummaries()}:Q.dispatch(R,Ge,{...m?{channel:m}:{},...y?{sessionId:y}:{}})}})}let{op:b,params:v}=E(d,h);return s(b,v,y,m)},onBridgeCreated:d=>{d.setSessionsProvider(()=>n.summaries().filter(y=>y.lastUsedMs<36e5).map(y=>({id:y.id,writeCount:y.writeCount,lastUsedMs:y.lastUsedMs}))),n.get(t)}});async function s(d,h,y,m){let b=r();if(!b)throw new g("NOT_CONNECTED","No bridge on this process (it is a follower or not yet started).","This should be unreachable; report as a bug.");if(d==="list_channels")return b.channelSummaries();let v=await b.dispatch(d,h,{...m?{channel:m}:{},...y?{sessionId:y}:{}});return Kt(v)}async function u(d,h,y,m){let{op:b,params:v}=E(d,h),T=e(y);return o.role==="leader"?s(b,v,T,m):o.forward(b,v,T,m)}async function a(d,h,y){let m=e(h);if(o.role==="follower")return o.forward("__write__",{code:d},m,y);let b=n.get(m);return ae(d,b,{runOp:async(v,T)=>{let{op:H,params:K}=E(v,T),R=r();if(!R)throw new g("NOT_CONNECTED","Bridge unavailable.","Restart the server.");return H==="list_channels"?{id:"server",ok:!0,result:R.channelSummaries()}:R.dispatch(H,K,{...y?{channel:y}:{},sessionId:m})}})}function c(d){return{pluginConnected:d.pluginConnected,...d.plugin?{plugin:{version:d.plugin.version,protocolVersion:d.plugin.protocolVersion,fileName:d.plugin.fileName,pageName:d.plugin.pageName,editorType:d.plugin.editorType}}:{},channels:d.channelSummaries().map(h=>({...h,boundSessions:n.summaries().filter(y=>d.sessionBinding(y.id)===h.channel).map(y=>y.id)})),lastHeartbeatMs:d.lastHeartbeatMs,queueLength:d.queueLength,pendingCount:d.pendingCount}}let l=async()=>{let d=o.info(),h=r();if(o.role==="leader"&&h)return{mode:"leader",port:h.port,bridgeAuth:d?.token?"ok":"missing",statusSource:"local",...c(h),leader:d,defaultSessionId:t,...h.sessionBinding(t)?{boundChannel:h.sessionBinding(t)}:{}};let y={mode:"follower",port:d?.port??0,bridgeAuth:d?.token?"ok":"missing",leader:d,defaultSessionId:t};try{let m=await o.forward("__status__",{},t,void 0,ie),b=m.channels?.find(v=>v.boundSessions?.includes(t))?.channel;return{...y,statusSource:"leader",...m,...b?{boundChannel:b}:{}}}catch(m){let b=d?await k.fetchHealth(d.port,ie):void 0;return b&&typeof b.pluginConnected=="boolean"?{...y,statusSource:"leader",pluginConnected:b.pluginConnected,...b.plugin?{plugin:b.plugin}:{},channels:(b.channels??[]).map(v=>({...v,boundSessions:[]})),lastHeartbeatMs:b.lastHeartbeatMs??null,queueLength:b.queueLength??0,pendingCount:b.pendingCount??0}:{...y,statusSource:"unknown",statusError:m instanceof Error?m.message:String(m),pluginConnected:null,lastHeartbeatMs:null,queueLength:0,pendingCount:0}}},p={runValidated:u,runWrite:a,sessions:n,diagnostics:l};await o.start(),o.role==="follower"&&o.forward("__register__",{},t).catch(()=>{});let _=new Vt({name:"reqwise-figma-mcp",version:O},{capabilities:{tools:{}}});return _.setRequestHandler($t,async()=>({tools:Wt})),_.setRequestHandler(zt,async d=>{let{name:h,arguments:y={}}=d.params;try{let m=await Xt(p,h,y);return Zt(m)}catch(m){return Yt(m)}}),{server:_,coordinator:o,diagnostics:l,close:async()=>{await o.close()}}}async function Xt(n,t,e){switch(t){case"figma_status":return Ue(n);case"figma_read":return Ve(n,String(e.op??""),e.params??{},e.channel);case"figma_write":return qe(n,String(e.code??""),e.sessionId,e.channel);case"figma_rules":return ze(n,e.channel);case"figma_docs":return $e(String(e.section??""));default:throw new g("INVALID_PARAMS",`Unknown tool "${t}".`,"Tools: figma_status, figma_read, figma_write, figma_rules, figma_docs.")}}function Kt(n){if(!n.ok){let t=n.error??{code:"INTERNAL",message:"Operation failed with no error detail."};throw new g(t.code,t.message,t.hint)}return n.warnings?.length?{result:n.result,warnings:n.warnings}:n.result}var Qt={PNG:"image/png",JPG:"image/jpeg",JPEG:"image/jpeg"};function We(n){if(!n||typeof n!="object")return null;let t=n,e=t.base64,r=typeof t.format=="string"?t.format.toUpperCase():"",o=Qt[r];if(typeof e!="string"||e.length===0||!o)return null;let s={format:r};return t.nodeId!==void 0&&(s.nodeId=t.nodeId),t.scale!==void 0&&(s.scale=t.scale),{content:[{type:"text",text:JSON.stringify(s)},{type:"image",data:e,mimeType:o}]}}function Zt(n){let t=We(n);if(t)return t;if(n&&typeof n=="object"&&"result"in n&&"warnings"in n){let r=We(n.result);if(r)return r.content.unshift({type:"text",text:JSON.stringify({warnings:n.warnings})}),r}return{content:[{type:"text",text:typeof n=="string"?n:JSON.stringify(n)}]}}function Yt(n){let t=A(n);return{isError:!0,content:[{type:"text",text:JSON.stringify({code:t.code,message:t.message,hint:t.hint})}]}}async function en(){let n=await Jt(),t=new qt;await n.server.connect(t);let e=async()=>{try{await n.close()}finally{process.exit(0)}};process.on("SIGINT",e),process.on("SIGTERM",e)}import.meta.main&&en().catch(n=>{process.stderr.write(`[reqwise-figma-mcp] fatal: ${n instanceof Error?n.stack??n.message:String(n)}
`),process.exit(1)});export{Jt as createServer,Gt as resolveStartPort,Zt as toToolResult};
//# sourceMappingURL=index.js.map
