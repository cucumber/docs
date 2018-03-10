---
title: Voting
description: Vote on what the Cucumber team should work on
---

<script src="https://unpkg.com/netlify-auth-providers"></script>
<script>
var authenticator = new netlify.default ({});
authenticator.authenticate({provider:"github", scope: "user"}, function(err, data) {
  if (err) {
    console.error(err)
  }
  console.log("Authenticated with GitHub. Access Token: " + data.token);
})
</script>