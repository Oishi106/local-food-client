import { NavLink } from "react-router-dom";

const accent = "rgb(226,98,73)";

export default function ErrorPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-base-100/80 p-6">
			<div className="max-w-3xl w-full text-center rounded-3xl p-10 bg-white/80 backdrop-blur shadow-2xl border border-base-200">
				<div className="text-9xl mb-6">🍽️</div>
				<h1 className="text-4xl font-extrabold mb-2 text-heading">We couldn't find that page</h1>
				<p className="text-muted mb-6">Looks like the recipe you searched for got lost on the way. Try returning home or explore top rated foods.</p>

				<div className="flex items-center justify-center gap-3">
					<NavLink to="/" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: accent }}>
						Back to Home
					</NavLink>
					<NavLink to="/all-items" className="px-6 py-3 rounded-xl font-semibold border border-base-200 bg-base-100/60">
						Explore Foods
					</NavLink>
				</div>

				<div className="mt-6 text-sm text-muted">If you think this is an error, please report it to the site admin.</div>
			</div>
		</div>
	);
}
