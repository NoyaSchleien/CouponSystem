package org.noya.Webapp;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import facade.CouponClientFacade;
import general.ClientType;
import general.CouponSystem;
import general.CouponSystemException;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		CouponSystem cs = CouponSystem.getINSTANCE();
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");

		ClientType clientType = ClientType.valueOf(request.getParameter("clientOptions"));

		CouponClientFacade couponClientFacade = null;
		try {
			// perform login
			couponClientFacade = cs.login(userName, password, clientType);

		} catch (CouponSystemException e) {
			couponClientFacade = null;
		} catch (Exception e) {
			couponClientFacade = null;
		}

		if (couponClientFacade != null) {
			// place the facade on the Session
			request.getSession().setAttribute("facade", couponClientFacade);

			//create cookies
			Cookie cookieName = new Cookie("userName", userName);
			Cookie cookiePassword = new Cookie("password", password);
			Cookie cookieType = new Cookie("type", clientType.toString());

			//set cookies max age
			cookieName.setMaxAge(60 * 60 * 24);
			cookiePassword.setMaxAge(60 * 60 * 24);
			cookieType.setMaxAge(60 * 60 * 24);

			//add cookies
			response.addCookie(cookieName);
			response.addCookie(cookiePassword);
			response.addCookie(cookieType);

			//redirect based on client type
			switch (clientType) {
			case CUSTOMER:
				response.sendRedirect("clientSide/clientSide-Customer/customer.html");
				break;
			case COMPANY:
				response.sendRedirect("clientSide/clientSide-Company/company.html");
				break;
			case ADMIN:
				response.sendRedirect("clientSide/clientSide-Admin/admin.html");
				break;
			}
		} else {
			//Destroy cookie - in case someone comes back with a cookie, tries to login with different details and do not succeed    
			Cookie[] cookies = request.getCookies();
			if (cookies != null){
				for (Cookie cookie : cookies) {
					cookie.setValue("");
					cookie.setPath("/");
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}}
			//redirect to home page
			response.sendRedirect("clientSide/index.html#/index");

		}

	//	System.out.println("login succeeded");

	}

}
