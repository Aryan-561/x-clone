import React from 'react';
import Container from '../Container/Container';

function SidebarFooter() {
  return (
    <Container>
      <div className="text-xs text-gray-500 flex flex-wrap gap-x-2 gap-y-1 mt-4 px-4">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <a href="#" className="hover:underline">More</a>
        <span className="w-full mt-1">&copy; 2025 X Corp.</span>
      </div>
    </Container>
  );
}

export default SidebarFooter;
