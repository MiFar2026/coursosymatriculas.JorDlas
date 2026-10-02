<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="course-card">

    <div class="course-card__image">
      <img
        :src="course.image"
        :alt="course.title"
      />
    </div>

    <div class="course-card__content">

      <span class="course-card__language">
        {{ course.language }}
      </span>

      <h3>{{ course.title }}</h3>

      <p>
        {{ course.description }}
      </p>

      <div class="course-card__info">
        <span>⏱ {{ course.hours }} horas</span>
        <span>📍 {{ course.location }}</span>
        <span>💻 {{ course.modality }}</span>
      </div>

      <button class="course-card__button">
        Ver curso
      </button>

    </div>

  </article>
</template>

<style scoped>
.course-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.course-card__image {
  height: 180px;
  overflow: hidden;
}

.course-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card__content {
  padding: 24px;
}

.course-card__language {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.course-card h3 {
  margin: 8px 0;
  font-size: 24px;
}

.course-card p {
  color: #666;
  line-height: 1.5;
}

.course-card__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0;
  color: #555;
}

.course-card__button {
  width: 100%;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
</style>