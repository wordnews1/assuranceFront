<template>
  <b-row>
    <b-col>
      <div class="not-found-wrap text-center">
        <h1 class="text-60">
          500
        </h1>
        <p class="text-36 subheading mb-3">Error!</p>
        <p class="mb-5  text-muted text-18">
          Sorry, an error occured. Please try again later or call our support team.
        </p>
        <a class="btn btn-lg btn-primary btn-rounded" href="/"
          >Go back to home</a
        >
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    //title: "404 Not Found"
    title: "Error occurred"
  }
};
</script>

