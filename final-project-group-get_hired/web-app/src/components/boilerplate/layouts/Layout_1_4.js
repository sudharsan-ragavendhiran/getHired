/**
 * This component is the layout for 1-4 is only for dev purposes.
 * Steps to use this component:
 * 1 - Copy the return value in your page
 * 2 - Replace the comments with the components of your page
 * @returns A generic layout component
 */

 function Layout_1_4() {
    return (
      <div className="prbg ht-full-viewport py-1">
        <div className="flex-horizontal">
          <div className="ly-1-4-bd-sec-left">
            {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          </div>
          <div className="ly-1-4-bd-sec-right">
            <div className="ly-1-4-bd-sec-right-container flex-horizontal">
              <div className="ly-1-4-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              </div>
            </div>
          </div>
        </div>
      </div>
  
    );
  }
  
  export default Layout_1_4;