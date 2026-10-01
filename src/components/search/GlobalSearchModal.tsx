import React, { useState, useMemo } from 'react';
import { Person, TimelineEvent, NationalRecord } from '../../types';
import { NIGERIA_TIMELINE } from '../../data/timeline';
import { NATIONAL_RECORDS } from '../../data/records';
import { Search, X, User, Calendar, Award, ArrowRight } from 'lucide-react';
import { NigeriaEmblem } from '../common/NigeriaLogo';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  people: Person[];
  onSelectPerson: (person: Person) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  people,
  onSelectPerson,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { people: [], timeline: [], records: [] };
    }

    const matchedPeople = people.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.biography.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.profession.some((pr) => pr.toLowerCase().includes(q)) ||
        p.categories.some((c) => c.toLowerCase().includes(q)) ||
        (p.birthDate && p.birthDate.toLowerCase().includes(q))
    );

    const matchedTimeline = NIGERIA_TIMELINE.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        String(t.year).includes(q) ||
        t.peopleInvolved.some((p) => p.toLowerCase().includes(q))
    );

    const matchedRecords = NATIONAL_RECORDS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.recordHolder.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.year.toLowerCase().includes(q)
    );

    return {
      people: matchedPeople,
      timeline: matchedTimeline,
      records: matchedRecords,
    };
  }, [query, people]);

  const hasResults =
    results.people.length > 0 || results.timeline.length > 0 || results.records.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#063a26] shadow-2xl text-stone-100 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#09150f]">
          <Search className="h-5 w-5 text-emerald-400 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search figures, events, records, years (e.g. 'Awolowo', '1960', 'Lagos')..."
            className="flex-1 bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-white mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-white" aria-label="Close">
            <span className="text-xs bg-white/10 px-2 py-1 rounded">ESC</span>
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-stone-500">
              Type a name (e.g. "Balewa", "Soyinka"), an era (e.g. "1960", "First Republic"), or a category.
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center">
              <NigeriaEmblem size="md" className="mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-300">
                We couldn't find that record yet
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching by surname, year (e.g., "1960"), or state name.
              </p>
            </div>
          ) : (
            <>
              {/* Matched People */}
              {results.people.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                    <User className="h-3.5 w-3.5" />
                    <span>Historical Figures ({results.people.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.people.map((person) => (
                      <div
                        key={person.id}
                        onClick={() => {
                          onClose();
                          onSelectPerson(person);
                        }}
                        className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:border-emerald-500/40 hover:bg-emerald-950/30 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-stone-900 shrink-0">
                            <img
                              src={person.portraitUrl}
                              alt={person.name}
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                          <div>
                            <div className="font-display text-sm font-bold text-white group-hover:text-emerald-300">
                              {person.name}
                            </div>
                            <div className="text-xs text-stone-400">
                              {person.positions[0]?.title || person.profession.join(' · ')} · {person.state} State
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-stone-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Timeline Events */}
              {results.timeline.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Timeline Events ({results.timeline.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.timeline.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-3 rounded-xl border border-white/5 bg-white/5"
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-emerald-400 font-bold">{evt.year}</span>
                          <span className="text-[10px] text-stone-500 uppercase">{evt.era}</span>
                        </div>
                        <div className="font-display text-sm font-semibold text-white">
                          {evt.title}
                        </div>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                          {evt.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched National Records */}
              {results.records.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                    <Award className="h-3.5 w-3.5" />
                    <span>National Records ({results.records.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.records.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-3 rounded-xl border border-white/5 bg-white/5"
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-emerald-400 font-medium uppercase text-[10px]">
                            {rec.category}
                          </span>
                          <span className="font-mono text-stone-400 text-xs">{rec.year}</span>
                        </div>
                        <div className="font-display text-sm font-semibold text-white">
                          {rec.title}
                        </div>
                        <div className="text-xs text-emerald-300/90 font-medium mt-0.5">
                          {rec.recordHolder} · {rec.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
