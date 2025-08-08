import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold text-lg">IDEA</div>
          <p className="text-sm text-muted-foreground mt-2">
            International Development & Economic Advisory
          </p>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
            <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Connect</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-foreground">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} IDEA. All rights reserved.
      </div>
    </footer>
  );
};

export default SiteFooter;