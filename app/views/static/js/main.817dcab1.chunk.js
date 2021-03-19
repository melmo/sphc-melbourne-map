(this["webpackJsonpsphc-map-react"]=this["webpackJsonpsphc-map-react"]||[]).push([[0],{172:function(e,t,s){"use strict";s.r(t);var a=s(2),n=s(57),i=s.n(n),r=s(12),c=s(4),o=s(5),l=s(3),d=s(7),u=s(6),h=s(8),j=(s(64),s(65),s(22)),b=s.n(j),m=b.a.create({baseURL:"https://sphc-melbourne-map.herokuapp.com/api/",headers:{"Content-type":"application/json"}});function g(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}var O=new(function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,[{key:"getAll",value:function(){return console.log(g()),m.get("/locations",{headers:g()})}},{key:"get",value:function(e){return m.get("/locations/".concat(e),{headers:g()})}},{key:"create",value:function(e){return m.post("/locations",e,{headers:g()})}},{key:"update",value:function(e,t){return m.put("/locations/".concat(e),t,{headers:g()})}},{key:"delete",value:function(e){return m.delete("/locations/".concat(e),{headers:g()})}},{key:"deleteAll",value:function(){return m.delete("/locations",{headers:g()})}},{key:"findByTitle",value:function(e){return m.get("/locations?title=".concat(e),{headers:g()})}}]),e}()),v="https://sphc-melbourne-map.herokuapp.com/api/auth/";console.log("API_URL"+v);var p=new(function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,[{key:"login",value:function(e,t){return b.a.post(v+"signin",{email:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e,t,s){return b.a.post(v+"signup",{username:e,email:t,password:s})}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}},{key:"requestToken",value:function(e){return b.a.post(v+"request-token",{email:e}).then((function(e){return e.data}))}},{key:"checkToken",value:function(e,t){return b.a.post(v+"check-token",{id:e,token:t}).then((function(e){return e.data}))}},{key:"resetPassword",value:function(e,t,s,a){return b.a.post(v+"reset-password",{email:e,token:t,id:s,password:a}).then((function(e){return e.data}))}}]),e}()),f=s(0),x=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).onChangeTitle=a.onChangeTitle.bind(Object(l.a)(a)),a.onChangeDescription=a.onChangeDescription.bind(Object(l.a)(a)),a.saveLocation=a.saveLocation.bind(Object(l.a)(a)),a.newLocation=a.newLocation.bind(Object(l.a)(a)),a.state={id:null,title:"",description:"",published:!1,submitted:!1,loggedInUser:null,isLoggedIn:!1,isMod:!1,isAdmin:!1},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=p.getCurrentUser();e&&this.setState({loggedInUser:e.id,isLoggedIn:!0,isMod:e.roles.includes("ROLE_MODERATOR"),isAdmin:e.roles.includes("ROLE_ADMIN")})}},{key:"onChangeTitle",value:function(e){this.setState({title:e.target.value})}},{key:"onChangeDescription",value:function(e){this.setState({description:e.target.value})}},{key:"saveLocation",value:function(){var e=this,t={title:this.state.title,description:this.state.description,authorId:this.state.loggedInUser};O.create(t).then((function(t){e.setState({id:t.data.id,title:t.data.title,description:t.data.description,published:t.data.published,submitted:!0})})).catch((function(e){console.log(e)}))}},{key:"newLocation",value:function(){this.setState({id:null,title:"",description:"",published:!1,submitted:!1})}},{key:"render",value:function(){return Object(f.jsx)("div",{className:"submit-form",children:this.state.submitted?Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:"You submitted successfully!"}),Object(f.jsx)("a",{className:"btn",href:"/admin/locations/"+this.state.id,children:"View location"}),Object(f.jsx)("button",{className:"btn btn-success",onClick:this.newLocation,children:"Add another location"})]}):Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"title",children:"Title"}),Object(f.jsx)("input",{type:"text",className:"form-control",id:"title",required:!0,value:this.state.title,onChange:this.onChangeTitle,name:"title"})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"description",children:"Description"}),Object(f.jsx)("input",{type:"text",className:"form-control",id:"description",required:!0,value:this.state.description,onChange:this.onChangeDescription,name:"description"})]}),Object(f.jsx)("button",{onClick:this.saveLocation,className:"btn btn-success",children:"Submit"})]})})}}]),s}(a.Component),k=s(9),C=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).onChangeTitle=a.onChangeTitle.bind(Object(l.a)(a)),a.onChangeDescription=a.onChangeDescription.bind(Object(l.a)(a)),a.getLocation=a.getLocation.bind(Object(l.a)(a)),a.updatePublished=a.updatePublished.bind(Object(l.a)(a)),a.updateLocation=a.updateLocation.bind(Object(l.a)(a)),a.deleteLocation=a.deleteLocation.bind(Object(l.a)(a)),a.state={currentLocation:{id:null,title:"",description:"",published:!1,authorId:null},message:"",loggedInUser:null,isLoggedIn:!1,isMod:!1,isAdmin:!1},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=p.getCurrentUser();e&&this.setState({loggedInUser:e.id,isLoggedIn:!0,isMod:e.roles.includes("ROLE_MODERATOR"),isAdmin:e.roles.includes("ROLE_ADMIN")}),this.getLocation(this.props.match.params.id)}},{key:"onChangeTitle",value:function(e){var t=e.target.value;this.setState((function(e){return{currentLocation:Object(k.a)(Object(k.a)({},e.currentLocation),{},{title:t})}}))}},{key:"onChangeDescription",value:function(e){var t=e.target.value;this.setState((function(e){return{currentLocation:Object(k.a)(Object(k.a)({},e.currentLocation),{},{description:t})}}))}},{key:"getLocation",value:function(e){var t=this;O.get(e).then((function(e){t.setState({currentLocation:e.data}),console.log(e.data)})).catch((function(e){console.log(e)}))}},{key:"updatePublished",value:function(e){var t=this,s={id:this.state.currentLocation.id,title:this.state.currentLocation.title,description:this.state.currentLocation.description,published:e,authorId:this.state.currentLocation.authorId,loggedInUser:this.state.loggedInUser};O.update(this.state.currentLocation.id,s).then((function(s){t.setState((function(t){return{currentLocation:Object(k.a)(Object(k.a)({},t.currentLocation),{},{published:e}),message:s.data.message}})),t.getLocation(t.state.currentLocation.id)})).catch((function(e){console.log(e),t.getLocation(t.state.currentLocation.id)}))}},{key:"updateLocation",value:function(){var e=this;O.update(this.state.currentLocation.id,this.state.currentLocation).then((function(t){console.log(t.data),e.setState({message:t.data.message}),e.getLocation(e.state.currentLocation.id)})).catch((function(t){console.log(t),e.getLocation(e.state.currentLocation.id)}))}},{key:"deleteLocation",value:function(){var e=this;O.delete(this.state.currentLocation.id).then((function(t){console.log(t.data),e.props.history.push("/locations")})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state.currentLocation;return Object(f.jsx)("div",{children:t?Object(f.jsxs)("div",{className:"edit-form",children:[Object(f.jsx)("h4",{children:"Location"}),Object(f.jsxs)("form",{children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"title",children:"Title"}),Object(f.jsx)("input",{type:"text",className:"form-control",id:"title",value:t.title,onChange:this.onChangeTitle})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"description",children:"Description"}),Object(f.jsx)("input",{type:"text",className:"form-control",id:"description",value:t.description,onChange:this.onChangeDescription})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Status:"})}),t.published?"Published":"Pending"]})]}),(this.state.loggedInUser==t.authorId||this.state.isMod||this.state.isAdmin)&&Object(f.jsx)("button",{className:"badge badge-primary mr-2",onClick:function(){return e.updatePublished(!t.published)},children:t.published?"UnPublish":"Publish"}),(this.state.loggedInUser==t.authorId||this.state.isMod||this.state.isAdmin)&&Object(f.jsx)("button",{type:"submit",className:"badge badge-success mr-2",onClick:this.updateLocation,children:"Update"}),this.state.isAdmin&&Object(f.jsx)("button",{className:"badge badge-danger",onClick:this.deleteLocation,children:"Delete"}),Object(f.jsx)("p",{children:this.state.message})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("br",{}),Object(f.jsx)("p",{children:"Please click on a Location..."})]})})}}]),s}(a.Component),N=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).onChangeSearchTitle=a.onChangeSearchTitle.bind(Object(l.a)(a)),a.retrieveLocations=a.retrieveLocations.bind(Object(l.a)(a)),a.refreshList=a.refreshList.bind(Object(l.a)(a)),a.setActiveLocation=a.setActiveLocation.bind(Object(l.a)(a)),a.removeAllLocations=a.removeAllLocations.bind(Object(l.a)(a)),a.searchTitle=a.searchTitle.bind(Object(l.a)(a)),a.state={locations:[],currentLocation:null,currentIndex:-1,searchTitle:"",loggedInUser:null,isLoggedIn:!1,isMod:!1,isAdmin:!1},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=p.getCurrentUser();e&&(this.setState({loggedInUser:e.id,isLoggedIn:!0,isMod:e.roles.includes("ROLE_MODERATOR"),isAdmin:e.roles.includes("ROLE_ADMIN")}),console.log(e)),this.retrieveLocations()}},{key:"onChangeSearchTitle",value:function(e){var t=e.target.value;this.setState({searchTitle:t})}},{key:"retrieveLocations",value:function(){var e=this;O.getAll().then((function(t){e.setState({locations:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"refreshList",value:function(){this.retrieveLocations(),this.setState({currentLocation:null,currentIndex:-1})}},{key:"setActiveLocation",value:function(e,t){this.setState({currentLocation:e,currentIndex:t})}},{key:"removeAllLocations",value:function(){var e=this;O.deleteAll().then((function(t){console.log(t.data),e.refreshList()})).catch((function(e){console.log(e)}))}},{key:"searchTitle",value:function(){var e=this;this.setState({currentLocation:null,currentIndex:-1}),O.findByTitle(this.state.searchTitle).then((function(t){e.setState({locations:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,s=t.searchTitle,a=t.locations,n=t.currentLocation,i=t.currentIndex;return Object(f.jsxs)("div",{className:"list row",children:[Object(f.jsx)("div",{className:"col-md-8",children:Object(f.jsxs)("div",{className:"input-group mb-3",children:[Object(f.jsx)("input",{type:"text",className:"form-control",placeholder:"Search by title",value:s,onChange:this.onChangeSearchTitle}),Object(f.jsx)("div",{className:"input-group-append",children:Object(f.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:this.searchTitle,children:"Search"})})]})}),Object(f.jsxs)("div",{className:"col-md-6",children:[Object(f.jsx)("h4",{children:"Locations List"}),Object(f.jsx)("ul",{className:"list-group",children:a&&a.map((function(t,s){return Object(f.jsx)("li",{className:"list-group-item "+(s===i?"active":""),onClick:function(){return e.setActiveLocation(t,s)},children:t.title},s)}))})]}),Object(f.jsx)("div",{className:"col-md-6",children:n?Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:"Location"}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Title:"})})," ",n.title]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Description:"})})," ",n.description]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Status:"})})," ",n.published?"Published":"Pending"]}),(this.state.loggedInUser==n.authorId||this.state.isMod||this.state.isAdmin)&&Object(f.jsx)(r.b,{to:"/admin/locations/"+n.id,className:"badge badge-warning",children:"Edit"})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("br",{}),Object(f.jsx)("p",{children:"Please click on a Location..."})]})})]})}}]),s}(a.Component),y=s(18),U=s.n(y),w=s(11),L=s.n(w),S=s(19),I=s.n(S),A=s(20),P=new(function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,[{key:"getAll",value:function(){return m.get("/users",{headers:g()})}},{key:"get",value:function(e){return m.get("/users/".concat(e),{headers:g()})}},{key:"create",value:function(e){return m.post("/users",e,{headers:g()})}},{key:"update",value:function(e,t){return m.put("/users/".concat(e),t,{headers:g()})}},{key:"delete",value:function(e){return m.delete("/users/".concat(e),{headers:g()})}},{key:"deleteAll",value:function(){return m.delete("/users",{headers:g()})}},{key:"findByUsername",value:function(e){return m.get("/users?username=".concat(e),{headers:g()})}}]),e}()),T=function(e){if(!e)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},E=function(e){if(!Object(A.isEmail)(e))return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This is not a valid email."})},D=function(e){if(e.length<3||e.length>20)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The username must be between 3 and 20 characters."})},M=function(e){if(e.length<6||e.length>40)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The password must be between 6 and 40 characters."})},R=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).onChangeUsername=a.onChangeUsername.bind(Object(l.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(l.a)(a)),a.onChangeRole=a.onChangeRole.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.saveUser=a.saveUser.bind(Object(l.a)(a)),a.newUser=a.newUser.bind(Object(l.a)(a)),a.state={id:null,username:"",email:"",role:1,password:"",success:!1,message:""},a}return Object(o.a)(s,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onChangeRole",value:function(e){this.setState({role:e.target.value})}},{key:"saveUser",value:function(e){var t=this;if(e.preventDefault(),this.form.validateAll(),0===this.checkBtn.context._errors.length){var s={user:{username:this.state.username,email:this.state.email,password:this.state.password,role:this.state.role}};P.create(s).then((function(e){console.log(e),e.data.success?t.setState({id:e.data.user.id,username:e.data.user.username,email:e.data.user.email,role:e.data.user.role,success:e.data.success,message:e.data.message}):t.setState({success:e.data.success,message:e.data.message}),console.log(e.data)})).catch((function(e){console.log(e)}))}}},{key:"newUser",value:function(){this.setState({id:null,email:"",username:"",password:"",role:1,message:"",success:!1})}},{key:"render",value:function(){var e=this;return Object(f.jsx)("div",{className:"submit-form",children:this.state.success?Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:this.state.message}),Object(f.jsx)("a",{className:"btn",href:"/admin/users/"+this.state.id,children:"View user"}),Object(f.jsx)("button",{className:"btn",onClick:this.newUser,children:"Add another user"})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:"Add new user"}),Object(f.jsxs)(U.a,{onSubmit:this.saveUser,ref:function(t){e.form=t},children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"username",children:"Username"}),Object(f.jsx)(L.a,{type:"text",className:"form-control",id:"username",validations:[T,D],value:this.state.username,onChange:this.onChangeUsername,name:"username"})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"email",children:"Email"}),Object(f.jsx)(L.a,{type:"email",className:"form-control",id:"email",validations:[T,E],value:this.state.email,onChange:this.onChangeEmail,name:"email"})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"password",children:"Password"}),Object(f.jsx)(L.a,{type:"password",className:"form-control",id:"password",validations:[T,M],value:this.state.password,onChange:this.onChangePassword,name:"password"})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"role",children:"Role"}),Object(f.jsxs)("select",{className:"form-control",id:"role",required:!0,value:this.state.role,onChange:this.onChangeRole,name:"role",children:[Object(f.jsx)("option",{value:"1",children:"User"}),Object(f.jsx)("option",{value:"2",children:"Moderator"}),Object(f.jsx)("option",{value:"3",children:"Admin"})]})]}),Object(f.jsx)("button",{className:"btn btn-success",children:"Submit"}),Object(f.jsx)("p",{children:this.state.message}),Object(f.jsx)(I.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})}}]),s}(a.Component),_=function(e){if(!e)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},F=function(e){if(!Object(A.isEmail)(e))return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This is not a valid email."})},q=function(e){if(e.length<3||e.length>20)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The username must be between 3 and 20 characters."})},B=function(e){if(e.length<6||e.length>40)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The password must be between 6 and 40 characters."})},J=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).onChangeUsername=a.onChangeUsername.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(l.a)(a)),a.onChangeDoUpdatePassword=a.onChangeDoUpdatePassword.bind(Object(l.a)(a)),a.onChangeRoleId=a.onChangeRoleId.bind(Object(l.a)(a)),a.getUser=a.getUser.bind(Object(l.a)(a)),a.updateUser=a.updateUser.bind(Object(l.a)(a)),a.deleteUser=a.deleteUser.bind(Object(l.a)(a)),a.state={currentUser:{id:null,username:"",email:"",roleId:0,password:""},message:"",isLoggedIn:!1,isAdmin:!1,isMod:!1,loggedInUser:0,newPassword:"",doUpdatePassword:!1},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=p.getCurrentUser();e&&this.setState({loggedInUser:e.id,isLoggedIn:!0,isMod:e.roles.includes("ROLE_MODERATOR"),isAdmin:e.roles.includes("ROLE_ADMIN")}),void 0!==this.props.match?this.getUser(this.props.match.params.id):this.getUser(this.props.id),console.log(this.state.currentUser)}},{key:"onChangeDoUpdatePassword",value:function(e){this.setState({doUpdatePassword:!this.state.doUpdatePassword})}},{key:"onChangePassword",value:function(e){var t=e.target.value;this.setState((function(e){return{currentUser:Object(k.a)(Object(k.a)({},e.currentUser),{},{password:t}),newPassword:t}}))}},{key:"onChangeUsername",value:function(e){var t=e.target.value;this.setState((function(e){return{currentUser:Object(k.a)(Object(k.a)({},e.currentUser),{},{username:t})}}))}},{key:"onChangeEmail",value:function(e){var t=e.target.value;this.setState((function(e){return{currentUser:Object(k.a)(Object(k.a)({},e.currentUser),{},{email:t})}}))}},{key:"onChangeRoleId",value:function(e){var t=e.target.value;this.setState((function(e){return{currentUser:Object(k.a)(Object(k.a)({},e.currentUser),{},{roleId:t})}}))}},{key:"getUser",value:function(e){var t=this;P.get(e).then((function(e){t.setState({currentUser:e.data}),console.log(e.data)})).catch((function(e){console.log(e)}))}},{key:"updateUser",value:function(e){var t=this;e.preventDefault(),this.form.validateAll(),0===this.checkBtn.context._errors.length&&P.update(this.state.currentUser.id,{user:this.state.currentUser,updatePassword:!!this.state.newPassword}).then((function(e){console.log("updated"),console.log(e.data),t.getUser(t.state.currentUser.id),t.setState((function(t){return{message:e.data.message,newPassword:"",doUpdatePassword:!1}}))})).catch((function(e){console.log(e)}))}},{key:"deleteUser",value:function(){var e=this;P.delete(this.state.currentUser.id).then((function(t){console.log(t.data),e.props.history.push("/admin/users")})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,s=t.currentUser,a=t.isAdmin,n=t.loggedInUser,i=t.newPassword,r=t.doUpdatePassword;return Object(f.jsx)("div",{children:s?Object(f.jsxs)("div",{className:"edit-form",children:[Object(f.jsx)("h4",{children:s.username}),Object(f.jsxs)(U.a,{onSubmit:this.saveUser,ref:function(t){e.form=t},children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"username",children:"Username"}),Object(f.jsx)(L.a,{type:"text",className:"form-control",id:"username",validations:[_,q],value:s.username,onChange:this.onChangeUsername})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"email",children:"Email"}),Object(f.jsx)(L.a,{type:"email",className:"form-control",id:"email",validations:[_,F],value:s.email,onChange:this.onChangeEmail})]}),a&&n!==s.id?Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"roleId",children:"Role"}),Object(f.jsxs)("select",{className:"form-control",id:"roleId",required:!0,value:s.roleId,onChange:this.onChangeRoleId,name:"roleId",children:[Object(f.jsx)("option",{value:"1",children:"User"}),Object(f.jsx)("option",{value:"2",children:"Moderator"}),Object(f.jsx)("option",{value:"3",children:"Admin"})]})]}):Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"roleDisplay",children:"Role"}),Object(f.jsx)(L.a,{disabled:!0,className:"form-control",id:"roleDisplay",name:"roleDisplay",value:{0:"",1:"User",2:"Moderator",3:"Admin"}[s.roleId]})]}),(a||n===s.id)&&!r&&Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("button",{className:"badge",onClick:this.onChangeDoUpdatePassword,children:"Change password"})}),(a||n===s.id)&&r&&Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"password",children:"Password"}),Object(f.jsx)(L.a,{type:"password",className:"form-control",id:"password",validations:[B],value:i,onChange:this.onChangePassword,name:"password"})]}),a&&n!==s.id&&Object(f.jsx)("button",{className:"badge badge-danger mr-2",onClick:this.deleteUser,children:"Delete"}),Object(f.jsx)("button",{type:"submit",className:"badge badge-success",onClick:this.updateUser,children:"Update"}),Object(f.jsx)(I.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]}),Object(f.jsx)("p",{children:this.state.message})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("br",{}),Object(f.jsx)("p",{children:"Please click on a User..."})]})})}}]),s}(a.Component),H=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).onChangeSearchUsername=a.onChangeSearchUsername.bind(Object(l.a)(a)),a.retrieveUsers=a.retrieveUsers.bind(Object(l.a)(a)),a.refreshList=a.refreshList.bind(Object(l.a)(a)),a.setActiveUser=a.setActiveUser.bind(Object(l.a)(a)),a.removeAllUsers=a.removeAllUsers.bind(Object(l.a)(a)),a.searchUsername=a.searchUsername.bind(Object(l.a)(a)),a.state={users:[],currentUser:null,currentIndex:-1,searchUsername:""},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){this.retrieveUsers()}},{key:"onChangeSearchUsername",value:function(e){var t=e.target.value;this.setState({searchUsername:t})}},{key:"retrieveUsers",value:function(){var e=this;P.getAll().then((function(t){e.setState({users:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"refreshList",value:function(){this.retrieveUsers(),this.setState({currentUser:null,currentIndex:-1})}},{key:"setActiveUser",value:function(e,t){this.setState({currentUser:e,currentIndex:t})}},{key:"removeAllUsers",value:function(){var e=this;P.deleteAll().then((function(t){console.log(t.data),e.refreshList()})).catch((function(e){console.log(e)}))}},{key:"searchUsername",value:function(){var e=this;this.setState({currentUsername:null,currentIndex:-1}),P.findByUsername(this.state.searchUsername).then((function(t){e.setState({users:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,s=t.searchUsername,a=t.users,n=t.currentUser,i=t.currentIndex;return Object(f.jsxs)("div",{className:"list row",children:[Object(f.jsx)("div",{className:"col-md-8",children:Object(f.jsxs)("div",{className:"input-group mb-3",children:[Object(f.jsx)("input",{type:"text",className:"form-control",placeholder:"Search by username",value:s,onChange:this.onChangeSearchUsername}),Object(f.jsx)("div",{className:"input-group-append",children:Object(f.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:this.searchUsername,children:"Search"})})]})}),Object(f.jsxs)("div",{className:"col-md-6",children:[Object(f.jsx)("h4",{children:"Users List"}),Object(f.jsx)("ul",{className:"list-group",children:a&&a.map((function(t,s){return Object(f.jsx)("li",{className:"list-group-item "+(s===i?"active":""),onClick:function(){return e.setActiveUser(t,s)},children:t.username},s)}))})]}),Object(f.jsx)("div",{className:"col-md-6",children:n?Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:"User"}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Username:"})})," ",n.username]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Email:"})})," ",n.email]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{children:Object(f.jsx)("strong",{children:"Role:"})})," ",n.role]}),Object(f.jsx)(r.b,{to:"/admin/users/"+n.id,className:"badge badge-warning",children:"Edit"})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("br",{}),Object(f.jsx)("p",{children:"Please click on a user"})]})})]})}}]),s}(a.Component),V=s(59);function W(e){var t=e.component,s=e.auth,a=e.authCheckComplete,n=Object(V.a)(e,["component","auth","authCheckComplete"]);return console.log("auth: "+s),Object(f.jsx)(h.b,Object(k.a)(Object(k.a)({},n),{},{render:function(e){return!1===a?Object(f.jsx)("div",{}):!0===s?Object(f.jsx)(t,Object(k.a)({},e)):Object(f.jsx)(h.a,{to:{pathname:"/login",state:{from:e.location}}})}}))}var Y=function(e){if(!e)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},$=function(e){if(!Object(A.isEmail)(e))return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This is not a valid email."})},z=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).handleLogin=a.handleLogin.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(l.a)(a)),a.state={email:"",password:"",loading:!1,message:""},a}return Object(o.a)(s,[{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?p.login(this.state.email,this.state.password).then((function(){console.log(t.props),window.location.pathname="/admin/locations"}),(function(e){var s=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:s})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(f.jsx)("div",{className:"col-md-12",children:Object(f.jsxs)("div",{className:"card card-container",children:[Object(f.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(f.jsxs)(U.a,{onSubmit:this.handleLogin,ref:function(t){e.form=t},children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"email",children:"Email"}),Object(f.jsx)(L.a,{type:"email",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[Y,$]})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"password",children:"Password"}),Object(f.jsx)(L.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[Y]})]}),Object(f.jsx)("div",{className:"form-group",children:Object(f.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(f.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(f.jsx)("span",{children:"Login"})]})}),this.state.message&&Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.message})}),Object(f.jsx)(I.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]}),Object(f.jsx)("a",{href:"./reset-password",children:"Password reset"})]})})}}]),s}(a.Component),G=function(e){if(!e)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},K=function(e){if(e.length<6||e.length>40)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The password must be between 6 and 40 characters."})},Q=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).resetPassword=a.resetPassword.bind(Object(l.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(l.a)(a)),a.state={email:"",password:"",token:"",id:0,loading:!0,message:"",success:!1},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props.match.params),void 0===this.props.match?this.setState({loading:!1,message:"No valid token found."}):p.checkToken(this.props.match.params.id,this.props.match.params.token).then((function(t){console.log(t),e.setState({loading:!1,message:t.message,token:e.props.match.params.token,id:e.props.match.params.id,success:t.success})}))}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"resetPassword",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?p.resetPassword(this.state.email,this.state.token,this.state.id,this.state.password).then((function(e){console.log(e),t.setState({loading:!1,message:e.message,success:e.success})}),(function(e){var s=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:s})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(f.jsx)("div",{className:"col-md-12",children:Object(f.jsxs)("div",{className:"card card-container",children:[Object(f.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(f.jsxs)(U.a,{onSubmit:this.resetPassword,ref:function(t){e.form=t},children:[this.state.message&&Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("div",{className:this.state.success?"alert alert-success":"alert alert-danger",role:"alert",children:this.state.message})}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"password",children:"Password"}),Object(f.jsx)(L.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[G,K]})]}),Object(f.jsx)("div",{className:"form-group",children:Object(f.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(f.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(f.jsx)("span",{children:"Set new password"})]})}),Object(f.jsx)(I.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})}}]),s}(a.Component),X=function(e){if(!e)return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},Z=function(e){if(!Object(A.isEmail)(e))return Object(f.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This is not a valid email."})},ee=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).requestToken=a.requestToken.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.state={email:"",loading:!1,message:""},a}return Object(o.a)(s,[{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"requestToken",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?p.requestToken(this.state.email).then((function(e){console.log(e),t.setState({loading:!1,message:e.message})}),(function(e){var s=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:s})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(f.jsx)("div",{className:"col-md-12",children:Object(f.jsxs)("div",{className:"card card-container",children:[Object(f.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(f.jsxs)(U.a,{onSubmit:this.requestToken,ref:function(t){e.form=t},children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"email",children:"Email"}),Object(f.jsx)(L.a,{type:"email",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[X,Z]})]}),Object(f.jsx)("div",{className:"form-group",children:Object(f.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(f.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(f.jsx)("span",{children:"Reset password"})]})}),this.state.message&&Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("div",{className:"alert",role:"alert",children:this.state.message})}),Object(f.jsx)(I.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})}}]),s}(a.Component),te=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).state={content:""},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(f.jsx)("div",{className:"container",children:Object(f.jsxs)("header",{className:"jumbotron",children:[Object(f.jsx)("h3",{children:"Save Public Housing Collective"}),Object(f.jsx)("h1",{children:"Melbourne Estate Map"}),Object(f.jsx)("p",{children:"SPHC is working to document the demolition and rebuilding of public housing estates across Melbourne."})]})})}}]),s}(a.Component),se=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).state={currentUser:p.getCurrentUser()},a}return Object(o.a)(s,[{key:"render",value:function(){var e=this.state.currentUser;return Object(f.jsx)("div",{className:"container",children:Object(f.jsx)(J,{id:e.id})})}}]),s}(a.Component),ae=(a.Component,a.Component,a.Component,function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).logOut=a.logOut.bind(Object(l.a)(a)),a.state={authCheckComplete:!1,isLoggedIn:!1,isMod:!1,isAdmin:!1,currentUser:void 0},a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=p.getCurrentUser();console.log("user"),console.log(e),e&&this.setState({currentUser:e,isLoggedIn:!!e,isMod:e.roles.includes("ROLE_MODERATOR"),isAdmin:e.roles.includes("ROLE_ADMIN")}),this.setState({authCheckComplete:!0})}},{key:"logOut",value:function(){p.logout()}},{key:"render",value:function(){var e=this.state,t=e.currentUser,s=e.isLoggedIn,a=(e.isMod,e.isAdmin),n=e.authCheckComplete;return Object(f.jsxs)("div",{children:[Object(f.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(f.jsx)("a",{href:"/",className:"navbar-brand",children:"SPHC Melbourne Map"}),t&&Object(f.jsxs)("div",{className:"navbar-nav ",children:[Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(r.b,{to:"/admin/locations",className:"nav-link",children:"Locations"})}),Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(r.b,{to:"/admin/locations/add",className:"nav-link",children:"Add Location"})})]}),a&&Object(f.jsxs)("div",{className:"navbar-nav",children:[Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(r.b,{to:"/admin/users",className:"nav-link",children:"Users"})}),Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(r.b,{to:"/admin/users/add",className:"nav-link",children:"Add User"})})]}),t?Object(f.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(r.b,{to:"/profile",className:"nav-link",children:"My profile"})}),Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)("a",{href:"/login",className:"nav-link",onClick:this.logOut,children:"Log out"})})]}):Object(f.jsx)("div",{className:"navbar-nav ml-auto",children:Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(r.b,{to:"/login",className:"nav-link",children:"Log in"})})})]}),Object(f.jsx)("div",{className:"container mt-3",children:Object(f.jsxs)(h.d,{children:[Object(f.jsx)(h.b,{exact:!0,path:["/","/home"],component:te}),Object(f.jsx)(W,{auth:s,authCheckComplete:n,exact:!0,path:["/admin/locations"],component:N}),Object(f.jsx)(W,{auth:s,authCheckComplete:n,path:["/admin/locations/add"],component:x}),Object(f.jsx)(W,{auth:s,authCheckComplete:n,path:["/admin/locations/:id"],component:C}),Object(f.jsx)(W,{auth:a,authCheckComplete:n,exact:!0,path:["/admin/users"],component:H}),Object(f.jsx)(W,{auth:a,authCheckComplete:n,path:["/admin/users/add"],component:R}),Object(f.jsx)(W,{auth:a,authCheckComplete:n,path:["/admin/users/:id"],component:J}),Object(f.jsx)(W,{auth:s,authCheckComplete:n,exact:!0,path:["/profile"],component:se}),Object(f.jsx)(h.b,{exact:!0,path:"/login",component:z}),Object(f.jsx)(h.b,{exact:!0,path:"/reset-password",component:ee}),Object(f.jsx)(h.b,{path:"/reset-password/:id/:token",component:Q})]})})]})}}]),s}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(f.jsx)(r.a,{children:Object(f.jsx)(ae,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},65:function(e,t,s){}},[[172,1,2]]]);
//# sourceMappingURL=main.817dcab1.chunk.js.map