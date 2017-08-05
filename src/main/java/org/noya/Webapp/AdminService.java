package org.noya.Webapp;

import java.io.IOException;
import java.util.Collection;
import java.util.logging.Level;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.tomcat.util.http.Cookies;

import com.sun.research.ws.wadl.Param;

import facade.AdminFacade;
import facade.facadeException;
import javaBeans.Company;
import javaBeans.Coupon;
import javaBeans.Customer;

/**
 * This class sends the requests from an administrator to the server and returns
 * responses
 */
@Path("/admin")
public class AdminService {

	@Context
	HttpServletRequest request;
	@Context
	private HttpServletResponse response;
	AdminFacade af = null;

	/**
	 * This method gets the facade from the session, if there is one.
	 * 
	 * @return AdminFacade
	 */
	private AdminFacade getAdminFacade() {
		// return null;
		af = (AdminFacade) request.getSession().getAttribute("facade");
		return af;
	}

	// private AdminFacade fakeLogin() {
	// AdminFacade af = null;
	// try {
	// af = (AdminFacade) CouponSystem.getINSTANCE().login("admin", "1234",
	// ClientType.ADMIN);
	// } catch (CouponSystemException e) {
	// e.printExceptions();
	// }
	// return af;
	// }

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * creates the new company that the administrator wants to create.
	 */
	@POST
	@Path("/createcompany")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createCompany(Company company) {
		MyLogger.logging(Level.INFO, "createCompany started");
		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			af.createCompany(company);
			MyLogger.logging(Level.INFO, "createCompany finished successfuly");
			return Response.ok(company.getCompName() + " was created").status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "createCompany failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * removes the company that the administrator chose, with this ID, from the
	 * database.
	 */
	@DELETE
	@Path("/removecompany/{compId}")
	public Response removeCompany(@PathParam("compId") long compId) {
		MyLogger.logging(Level.INFO, "removeCompany started");

		Company company = new Company(compId);
		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			af.removeCompany(company);
			MyLogger.logging(Level.INFO, "removeCompany finished successfuly");
			return Response.ok(company.getCompName() + " was removed").status(200).build();

		} catch (facadeException e) {
	//Patch - error in project - phase 1 - for some reason, when trying to delete a company, catch an exception if one of it's coupons cannot be deleted and then throws exception here. 
			if (e.getCause().getMessage().toLowerCase().contains("coupon"))
				return Response.ok(company.getCompName() + " was removed").status(200).build();

			MyLogger.logging(Level.WARNING, "removeCompany failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * updates the company with the new information from the client.
	 */
	@PUT
	@Path("/updatecompany")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateCompany(Company company) {
		MyLogger.logging(Level.INFO, "updateCompany started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			af.updateCompany(company);
			MyLogger.logging(Level.INFO, "updateCompany finished successfuly");
			return Response.ok(company.getCompName() + " was updated").status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "updateCompany failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * the company that the client asked for with its ID.
	 */
	@GET
	@Path("/getcompany/{compId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCompany(@PathParam("compId") long compId) {
		MyLogger.logging(Level.INFO, "getCompany started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		Company company = null;
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			company = af.getCompany(compId);
			MyLogger.logging(Level.INFO, "getCompany finished successfuly");
			return Response.ok(company).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCompany failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method gets all the companies in the Coupon System.
	 */
	@GET
	@Path("/getallcompanies")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllCompanies() {
		MyLogger.logging(Level.INFO, "getAllCompanies started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		Collection<Company> companies = null;
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			companies = af.getAllCompanies();
			GenericEntity<Collection<Company>> genericEntity = new GenericEntity<Collection<Company>>(companies) {
			};
			MyLogger.logging(Level.INFO, "getAllCompanies finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getAllCompanies failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * all the coupons of a specific company.
	 */
	@GET
	@Path("/getcoupons/{compId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCoupons(@PathParam("compId") long compId) {
		MyLogger.logging(Level.INFO, "getCoupons started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		Collection<Coupon> coupons = null;
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupons = af.getCoupons(compId);
			GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
			};
			MyLogger.logging(Level.INFO, "getCoupons finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCoupons failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * creates the new Customer that the administrator wants to create.
	 */
	@POST
	@Path("/createcustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createCustomer(Customer customer) {
		MyLogger.logging(Level.INFO, "createCustomer started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			af.createCustomer(customer);
			MyLogger.logging(Level.INFO, "createCustomer finished successfuly");
			return Response.ok(customer.getCustName() + " was created").status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "createCustomer failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * removes the customer that the administrator chose, with this ID, from the
	 * database.
	 */
	@DELETE
	@Path("/removecustomer/{custId}")
	public Response removeCustomer(@PathParam("custId") long custId) {
		MyLogger.logging(Level.INFO, "removeCustomer started");

		Customer customer = new Customer();
		customer.setCustId(custId);
		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			af.removeCustomer(customer);
			MyLogger.logging(Level.INFO, "removeCustomer finished successfuly");
			return Response.ok(customer.getCustName() + " was removed").status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "removeCustomer failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * updates the customer with the new information from the client.
	 */
	@PUT
	@Path("/updatecustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateCustomer(Customer customer) {
		MyLogger.logging(Level.INFO, "updateCustomer started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			af.updateCustomer(customer);
			MyLogger.logging(Level.INFO, "updateCustomer finished successfuly");
			return Response.ok(customer.getCustName() + " was updated").status(200).build();

		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "updateCustomer failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * the customer that the client asked for with its ID.
	 */
	@GET
	@Path("/getcustomer/{custId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCustomer(@PathParam("custId") long custId) {
		MyLogger.logging(Level.INFO, "getCustomer started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		Customer customer = null;
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			customer = af.getCustomer(custId);
			MyLogger.logging(Level.INFO, "getCustomer finished successfuly");
			return Response.ok(customer).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCustomer failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method gets all the customers in the Coupon System.
	 */
	@GET
	@Path("/getallcustomers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllCustomers() {
		MyLogger.logging(Level.INFO, "getAllCustomers started");

		// AdminFacade af = fakeLogin();
		AdminFacade af = getAdminFacade();
		Collection<Customer> customers = null;
		if (af == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			customers = af.getAllCustomers();
			GenericEntity<Collection<Customer>> genericEntity = new GenericEntity<Collection<Customer>>(customers) {
			};
			MyLogger.logging(Level.INFO, "getAllCustomers finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getAllCustomers failed");
			return Response.serverError().status(500).build();
		}
	}
}
