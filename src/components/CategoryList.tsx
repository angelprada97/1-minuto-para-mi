import React from 'react';
import { RoutineCategory, Routine } from '../types';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

interface CategoryListProps {
  categories: RoutineCategory[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  routines: Routine[];
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  routines,
}) => {
  return (
    <section id="category-selection-section" className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Paso 1: Selecciona tu técnica de 60 segundos
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Categorías de Pausas Activas
          </h2>
        </div>
        <button
          id="view-all-categories-btn"
          onClick={() => onSelectCategory(null)}
          className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors border ${
            selectedCategoryId === null
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs'
              : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {selectedCategoryId === null ? '✓ Mostrando Todas las Categorías' : 'Ver Todas las Categorías'}
        </button>
      </div>

      {/* Grid of categories with images and names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const count = routines.filter((r) => r.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border text-left bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs ${
                isSelected
                  ? 'border-emerald-600 dark:border-emerald-500 shadow-lg shadow-emerald-700/15 ring-2 ring-emerald-500/80 scale-[1.01]'
                  : 'border-emerald-900/10 dark:border-emerald-800/30 hover:border-emerald-400/60 dark:hover:border-emerald-600/60 hover:shadow-md'
              }`}
            >
              {/* Category Image Header */}
              <div className="relative h-44 sm:h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 backdrop-blur-xs shadow-xs">
                    {cat.badgeText}
                  </span>
                </div>

                {/* Selected Check Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {/* Name on image bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider">
                    {count} {count === 1 ? 'rutina disponible' : 'rutinas disponibles'}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight drop-shadow-xs">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Description & Action Footer */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                  {cat.tagline}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs font-semibold">
                  <span className={isSelected ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'}>
                    {isSelected ? 'Categoría seleccionada' : 'Explorar rutinas'}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                    isSelected ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'text-slate-400 group-hover:translate-x-1'
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
