/**
 * Fond anime de toute la page.
 * Trois taches de couleur floues derivent lentement derriere le contenu. Le calque
 * est fixe : il ne defile pas, ce qui evite de repeindre a chaque scroll. Purement
 * decoratif, donc masque aux lecteurs d'ecran, et immobile sous
 * `prefers-reduced-motion` (regle dans index.css).
 */
export default function Fond() {
  return (
    <div className="fond" aria-hidden="true">
      <span className="tache tache-1" />
      <span className="tache tache-2" />
      <span className="tache tache-3" />
    </div>
  );
}
