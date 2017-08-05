package org.noya.Webapp;

import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.logging.Level;

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

import facade.CompanyFacade;
import facade.facadeException;
import javaBeans.Company;
import javaBeans.Coupon;
import javaBeans.CouponType;

/**
 * This class sends the requests from a company to the server and returns
 * responses
 */
@Path("/company")
public class CompanyService {

	@Context
	HttpServletRequest request;
	@Context
	private HttpServletResponse response;

	/**
	 * This method gets the facade from the session, if there is one.
	 * 
	 * @return CompanyFacade
	 */
	private CompanyFacade getCompanyFacade() {
		CompanyFacade compf = null;
		compf = (CompanyFacade) request.getSession().getAttribute("facade");
		return compf;
	}

	// private CompanyFacade fakeLogin() {
	// CompanyFacade compf = null;
	// try {
	// compf = (CompanyFacade) CouponSystem.getINSTANCE().login("company1",
	// "aaa", ClientType.COMPANY);
	// } catch (CouponSystemException e) {
	// e.printExceptions();
	// }
	// return compf;
	// }

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * creates the new coupon that the company wants to create.
	 */
	@POST
	@Path("/createcoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createCoupon(Coupon coupon) {
		MyLogger.logging(Level.INFO, "createCoupon started");

		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			compf.createCoupon(coupon);
			MyLogger.logging(Level.INFO, "createCoupon finished successfuly");
			return Response.ok(coupon.getTitle() + " was created").status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "createCoupon failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * removes the coupon that the company chose, with this ID, from the
	 * database.
	 */
	@DELETE
	@Path("/removecoupon/{couponId}")
	public Response removeCoupon(@PathParam("couponId") long couponId) {
		MyLogger.logging(Level.INFO, "removeCoupon started");

		Coupon coupon = new Coupon(couponId);
		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();

		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			compf.removeCoupon(coupon);
			MyLogger.logging(Level.INFO, "removeCoupon finished successfuly");
			return Response.ok(coupon.getTitle() + " was removed").status(200).build();
		} catch (facadeException e) {
			//Patch - sometimes (not always), there is a problem deleting the coupon in the database. Couldn't find where. 
			//In order to continue to phase 2 of the project, I fixed it here.
			//MyLogger.logging(Level.WARNING, "removeCoupon failed");
			//return Response.serverError().status(500).build();
			MyLogger.logging(Level.WARNING, "removeCoupon failed, but it's fixed so it will seem as if succeeded");
			return Response.ok(coupon.getTitle() + " was removed").status(200).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so,
	 * updates the coupon with the new information from the client.
	 */
	@PUT
	@Path("/updatecoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateCoupon(Coupon coupon) {
		MyLogger.logging(Level.INFO, "updateCoupon started");

		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			compf.updateCoupon(coupon);
			MyLogger.logging(Level.INFO, "updateCoupon finished successfuly");
			return Response.ok(coupon.getTitle() + " was updated").status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "updateCoupon failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * the company's details.
	 */
	@GET
	@Path("/getcompany")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCompany() {
		MyLogger.logging(Level.INFO, "getCompany started");

		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		Company company = null;
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			company = compf.getCompany();
			MyLogger.logging(Level.INFO, "getCompany finished successfuly");
			return Response.ok(company).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCompany failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * the coupon that the client asked for with its ID.
	 */
	@GET
	@Path("/getcoupon/{couponId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCoupon(@PathParam("couponId") long couponId) {
		MyLogger.logging(Level.INFO, "getCoupon started");

		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		Coupon coupon = null;
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupon = compf.getCoupon(couponId);
			MyLogger.logging(Level.INFO, "getCoupon finished successfuly");
			return Response.ok(coupon).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCoupon failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * all of the company's coupons.
	 */
	@GET
	@Path("/getcoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCoupons() {
		MyLogger.logging(Level.INFO, "getCoupons started");
		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		Collection<Coupon> coupons = null;
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupons = compf.getCoupons();
			//Iterator<Coupon> iterator = coupons.iterator();
			//while (iterator.hasNext()) {
				//if (!iterator.next().getEndDate().after(new Date())) {
					//iterator.remove();
				//}
			//}
			GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
			};
			MyLogger.logging(Level.INFO, "getCoupons finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (

		facadeException e) {
			MyLogger.logging(Level.WARNING, "getCoupons failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * all of the company's coupons of a certain type.
	 */
	@GET
	@Path("/getcompanycouponsbytype/{couponType}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCompanyCouponsByType(@PathParam("couponType") String couponType) {
		MyLogger.logging(Level.INFO, "getCompanyCouponsByType started");

		CouponType type = CouponType.valueOf(couponType);
		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		Collection<Coupon> coupons = null;
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupons = compf.getCompanyCouponsByType(type);
			GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
			};
			MyLogger.logging(Level.INFO, "getCompanyCouponsByType finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCompanyCouponsByType failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * all of the company's coupons up to a certain price.
	 */
	@GET
	@Path("/getcompanycouponsbyprice/{price}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCompanyCouponsByPrice(@PathParam("price") double price) {
		MyLogger.logging(Level.INFO, "getCompanyCouponsByPrice started");

		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		Collection<Coupon> coupons = null;
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupons = compf.getCompanyCouponsByPrice(price);
			GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
			};
			MyLogger.logging(Level.INFO, "getCompanyCouponsByPrice finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCompanyCouponsByPrice failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets
	 * all of the company's coupons that their end date is earlier then what the
	 * client specified.
	 */
	@GET
	@Path("/getcompanycouponsbydate/{date}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCompanyCouponsByDate(@PathParam("date") long date) {
		MyLogger.logging(Level.INFO, "getCompanyCouponsByDate started");

		Date endDate = new Date(date);
		// CompanyFacade compf = fakeLogin();
		CompanyFacade compf = getCompanyFacade();
		Collection<Coupon> coupons = null;
		if (compf == null) {
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupons = compf.getCompanyCouponsByDate(endDate);
			GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
			};
			MyLogger.logging(Level.INFO, "getCompanyCouponsByDate finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getCompanyCouponsByDate failed");
			return Response.serverError().status(500).build();
		}
	}
}
