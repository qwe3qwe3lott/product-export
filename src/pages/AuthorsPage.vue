<template>
  <section class="section">
    <h1 class="title">Authors of the theory</h1>
    <div class="cards">
      <div class="card card1">
        <img class="image" alt="Kelvin Willoughby" src="@/assets/webp/KelvinWilloughby.webp">
        <div class="text">
          <h2 class="text-title">Professor Dr. Kelvin Willoughby</h2>
          <ul class="list">
            <li class="list-item">Holder of the Chair of Innovation Management und Entrepreneurship, HHL Leipzig Graduate School of Management, Leipzig, Germany</li>
            <li class="list-item">Doctor of Philosophy (Ph.D.) in Strategic Management and Technology Management, The University of Western Australia, Perth, Australia</li>
            <li class="list-item">Doctor of Philosophy (Ph.D.) in Technology Studies, Murdoch University, Perth, Australia</li>
          </ul>
          <p class="paragraph">Prof. Kelvin Willoughby is an expert on the management of intellectual property, technology-based entrepreneurship, and strategic planning for technology-based industry development. He holds doctorates in both strategic management and technology studies, and a masters degree in intellectual property law. Professor Willoughby has extensive experience as a university professor, researcher and industry consultant in the United States, Europe, Asia, Australia and Russia.</p>
        </div>
        <p class="contact">More information on <a class="link" href="https://kelvinwilloughby1.academia.edu" target="_blank">https://kelvinwilloughby1.academia.edu</a></p>
      </div>
      <div class="card card2">
        <img class="image" alt="Kelvin Willoughby" src="@/assets/webp/NadezhdaMullina.webp">
        <div class="text">
          <h2 class="text-title">Doctorate candidate Nadezhda Mullina</h2>
          <ul class="list">
            <li class="list-item">PhD student at HHL Leipzig Graduate School of Management, Leipzig, Germany</li>
            <li class="list-item">Dissertation topic: Intellectual Property and International Pathways for Appropriating Value from Endogenous Technological Innovation</li>
            <li class="list-item">Master of Science in Organization of high-tech production and logistics systems</li>
            <li class="list-item">Bachelor in Innovations</li>
          </ul>
          <p class="paragraph">Contact by <span class="link">nadezhda.mullina@hhl.de</span></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthorsPage'
})
</script>

<style scoped>
.section {
  width: 60em;
  display: grid;
  place-items: stretch;
}
.title {
  padding: 1em 0;
  font-size: 1.6em;
  text-align: center;
  color: var(--secondary-color);
}
.cards {
  padding: 0 2em 2em 2em;
  width: 100%;
  display: grid;
  gap: 2em;
}
.card {
  padding: 3em;
  width: 100%;
  position: relative;
  display: grid;
  gap: 2em;
}
.card1 {
  grid-template: 'i t' auto
                  'c c' auto / 1fr 3fr;
}
.card2 {
  grid-template: 't i' auto / 3fr 1fr;
}
.card::after {
  content: '';
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  width: calc(100% - 1em);
  height: calc(100% - 1em);
  border: 0.15em solid var(--primary-color);
  border-radius: 5em;
  pointer-events: none;
}
.card::before {
  content: '';
  top: 1em;
  left: 1em;
  position: absolute;
  display: block;
  width: calc(100% - 1em);
  height: calc(100% - 1em);
  border: 0.15em solid var(--primary-color);
  border-radius: 5em;
  pointer-events: none;
}
.image {
  grid-area: i;
  width: 16em;
  place-self: start center;
}
.text {
  grid-area: t;
}
.text-title {
  font-weight: bold;
  margin-bottom: 1em;
  font-size: 1.2em;
}
.list {
  text-align: justify;
  margin-bottom: 1em;
  padding-left: 1em;
}
.list-item {
  list-style: disc outside;
  margin-bottom: 0.5em;
}
.paragraph {
  text-align: justify;
}
.contact {
  grid-area: c;
}
.link {
  text-decoration: underline;
}
@media (max-width: 1200px) {
  .section {
    width: unset;
  }
}
@media (max-width: 800px) {
  .cards {
    padding: 0 1em 2em 1em;
  }
  .card {
    border: 0.15em solid var(--primary-color);
    border-radius: 3em;
    padding: 2em;
  }
  .card::after, .card::before {
    display: none;
  }
  .card1 {
    grid-template: 'i' auto
                  't' auto
                  'c' auto / 1fr;
  }
  .card2 {
    grid-template: 'i' auto
                  't' auto / 1fr;
  }
}
</style>
