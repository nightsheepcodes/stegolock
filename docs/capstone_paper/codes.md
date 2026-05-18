<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d;">// AuthController.php</span></div>
<div><span style="color: #24292e;">$user</span>-&gt;<span style="color: #24292e;">password</span> = <span style="color: #24292e;">Hash</span>::<span style="color: #6f42c1;">make</span>(<span style="color: #24292e;">$request</span>-&gt;<span style="color: #6f42c1;">input</span>(<span style="color: #032f62;">'password'</span>));</div>
<div><span style="color: #24292e;">$user</span>-&gt;<span style="color: #6f42c1;">save</span>();</div>
</div>

Secure Password Hashing using Bcrypt<br>
stegolock\app\Http\Controllers\AuthController.php

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d;">// routes/web.php</span></div>
<div><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">middleware</span>([<span style="color: #032f62;">'auth'</span>])-&gt;<span style="color: #6f42c1;">group</span>(<span style="color: #005cc5;">function</span> () {</div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">get</span>(<span style="color: #032f62;">'/documents'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'index'</span>]);</div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">post</span>(<span style="color: #032f62;">'/documents/lock'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'lock'</span>]);</div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">post</span>(<span style="color: #032f62;">'/documents/unlock'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'unlock'</span>]);</div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">post</span>(<span style="color: #032f62;">'/documents/share'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'share'</span>]);</div>
<div>});</div>
</div>

Authenticated Document Routes and Middleware Protection<br>
stegolock\routes\web.php

