import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { PROJECTS } from '../constants';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">03 // Projects</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">
            Things I've Built
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={24}
          pagination={{ clickable: true }}
          navigation={true}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full pb-14"
        >
          {PROJECTS.map((project) => (
            <SwiperSlide key={project.title}>
              <div
                className="group relative rounded-2xl border border-border bg-surface/40 overflow-hidden flex flex-col"
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              >
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />

                {/* Screenshot */}
                <div className="relative w-full h-44 overflow-hidden bg-black/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(to bottom, transparent 60%, ${project.color})` }}
                  />
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Subtitle + stat */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: project.color, boxShadow: `0 0 6px ${project.color}` }}
                      />
                      <span className="text-xs font-mono truncate" style={{ color: project.color }}>
                        {project.subtitle}
                      </span>
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-md ml-2 flex-shrink-0"
                      style={{
                        background: `${project.color}15`,
                        color: project.color,
                        border: `1px solid ${project.color}25`,
                      }}
                    >
                      {project.stat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-text mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dim text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">{tag}</span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                      style={{ color: project.color }}
                    >
                      View on GitHub
                      <span>&#8594;</span>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--color-accent);
        }
        .swiper-pagination-bullet-active {
          background: var(--color-accent);
        }
        .swiper-slide {
          height: auto;
        }
        .swiper-wrapper {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}