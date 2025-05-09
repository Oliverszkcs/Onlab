import "../../css/footer.css";
export default function Footer() {
	return (
		<div className="footer" id="contacts">
			<header>
				<div>
					<p className="footer-heading">
						Realestate <br />
						Subscribe To Our Newsletter
					</p>
				</div>
				<div>
					<div className="newsletter">
						<input type="text" placeholder="Your Email Address" />
						<button>
							<i
								class="fa fa-long-arrow-right"
								aria-hidden="true"
							></i>
							Send in
						</button>
					</div>
				</div>
			</header>
			<span className="footer-line"></span>
			<footer>
				<div className="logo-section">
					<p className="copy-heading">realestate</p>
				</div>
				<div className="footer-links">
					<div>
					</div>
					<div>
						<p>Company</p>
						<div className="foot-links">
							<a href="#!">About</a>
							<a href="#!">Contact</a>
							<a href="#!">Social</a>
						</div>
					</div>
					<div>
						<p>Product</p>
						<div className="foot-links">
							<a href="/browse">Apartments</a>
						</div>
					</div>
					<div>
						<p>Services</p>
						<div className="foot-links">
							<a href="/browse">Renting</a>
							<a href="/browse">Buying</a>
							<a href="/upload">Selling</a>
						</div>
					</div>
				</div>
				<p className="copyright">
						&copy; 2025 - created by{" "}
						<a href="https://github.com/oliverszkcs" target="_blank" rel="noreferrer">SzakácsOlivér</a>
					</p>
			</footer>
		</div>
	);
}
