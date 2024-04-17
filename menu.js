

// window.onload = generarMenu;
function generarMenu() {
  const menuElement = document.getElementById('menu-ul');

  fetch('menu.json')
    .then(response => response.json())
    .then(menu => {
      menu.menu.sections.forEach(section => {
        const listItem = document.createElement('li');
        const sectionLink = document.createElement('a');
        sectionLink.textContent = section.title;
        sectionLink.href = '#';
        listItem.appendChild(sectionLink);

        if (Array.isArray(section.items)) {
          const subMenu = document.createElement('ul');
          section.items.forEach(item => {
            if (typeof item === 'object') {
              const subListItem = document.createElement('li');
              const subSectionLink = document.createElement('a');
              subSectionLink.textContent = item.title;
              subSectionLink.href = '#';
              subListItem.appendChild(subSectionLink);

              if (Array.isArray(item.subItems)) {
                const subSubMenu = document.createElement('ul');
                item.subItems.forEach(subItem => {
                  const subSubListItem = document.createElement('li');
                  const subSubSectionLink = document.createElement('a');
                  subSubSectionLink.textContent = subItem;
                  subSubSectionLink.href = '#';
                  subSubListItem.appendChild(subSubSectionLink);
                  subSubMenu.appendChild(subSubListItem);
                });
                subListItem.appendChild(subSubMenu);
              }

              subMenu.appendChild(subListItem);
            } else {
              const subListItem = document.createElement('li');
              const subSectionLink = document.createElement('a');
              subSectionLink.textContent = item;
              subSectionLink.href = '#';
              subListItem.appendChild(subSectionLink);
              subMenu.appendChild(subListItem);
            }
          });
          listItem.appendChild(subMenu);
        }

        menuElement.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching menu data:', error));
}

window.onload = generarMenu;
