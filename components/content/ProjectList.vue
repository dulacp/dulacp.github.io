<template>
  <ul class="not-prose space-y-3 w-full max-w-4xl mx-auto pt-4 border-gray-200 mb-6">

    <li>
      <ProjectCard
        icon="(·)"
        url="https://dotprod.ai"
        name="Dot·Prod AI"
        year="2023"
        description="AI solutions for private"
      >
        <template v-slot:extraTag>
          <span class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            Full-time
          </span>
        </template>
      </ProjectCard>
    </li>

    <li>
      <ProjectCard
        icon="https://virtualface.app/favicon.ico"
        url="https://virtualface.app"
        name="Virtual Face AI"
        year="2023"
        description="Corporate headshots in 20 minutes by overfitting Stable Diffusion on a face"
      />
    </li>

    <li>
      <ProjectCard
        icon="https://www.google.com/favicon.ico"
        url="https://www.linkedin.com/in/dulacp/"
        name="Google"
        year="2017 &ndash; 2023"
        description="Applied AI as a Solutions Engineer for Ads large customers"
      />
    </li>

    <li>
      <ProjectCard
        icon="https://cdn.360player.io/static/images/ico/favicon-32.fbd7b5243a00.png"
        url="https://360player.io"
        name="360player"
        year="2017"
        description="Create virtual tours and embed them on your website"
      />
    </li>

    <li>
      <ProjectCard
        icon="🔮"
        url="https://www.lemonde.fr/m-perso/article/2016/06/06/photonomie-la-photo-a-360-degres_4939045_4497916.html"
        name="Photonomie"
        year="2016"
        description="Immersive 360 pictures in realtime on iOS"
      >
        <template v-slot:extraTag>
          <span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
            Retired
          </span>
        </template>
      </ProjectCard>
    </li>

    <li>
      <ProjectCard
        icon="🗃"
        url="https://www.itcdiaeurope.com/featured-insurtechs/valoo-previously-cbien-the-platform-for-your-belongings/"
        name="Valoo"
        year="2014"
        description="CTO by interim for this on-demand insurance startup"
      >
        <template v-slot:extraTag>
          <span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
            Retired
          </span>
        </template>
      </ProjectCard>
    </li>

    <li>
      <ProjectCard
        icon="🎠"
        url="#"
        name="Carousel"
        year="2013"
        description="Bookmark everything that you like and share with your friends"
      >
        <template v-slot:extraTag>
          <span class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            Sold domain to Dropbox
          </span>
        </template>
      </ProjectCard>
    </li>

    <li>
      <ProjectCard
        icon="https://www.anycommerce.io/favicon.ico"
        url="https://www.anycommerce.io"
        name="AnyCommerce"
        year="2012"
        description="Co-founded AnyCommerce (formerly known as Wynd)"
      >
        <template v-slot:extraTag>
          <span class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            Sold my shares
          </span>
        </template>
      </ProjectCard>
    </li>

    <li>
      <ProjectCard
        icon="💸"
        url="https://www.newsreports.com/napster-and-friendcash-come-to-the-app-store/"
        name="FriendCash iOS"
        year="2009"
        description="Manage expenses between friends and family"
      >
        <template v-slot:extraTag>
          <span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
            Retired
          </span>
        </template>
      </ProjectCard>
    </li>

  </ul>
</template>
