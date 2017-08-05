package org.noya.Webapp;

import java.util.Collection;
import java.util.logging.Level;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import facade.CustomerFacade;
import facade.facadeException;
import javaBeans.Coupon;
import javaBeans.CouponType;

/**
 * This class sends the requests from a customer to the server and returns responses
 * */
@Path("/customer")
public class CustomerService {

	@Context
	HttpServletRequest request;
	@Context
	private HttpServletResponse response;

	/**
	 * This method gets the facade from the session, if there is one.
	 * @return CustomerFacade
	 */
	private CustomerFacade getCustomerFacade() {
		CustomerFacade custf = null;
		custf = (CustomerFacade) request.getSession().getAttribute("facade");
		return custf;
	}

	// private CustomerFacade fakeLogin() {
	// CustomerFacade custf = null;
	// try {
	// custf = (CustomerFacade) CouponSystem.getINSTANCE().login("customer1",
	// "fff", ClientType.CUSTOMER);
	// } catch (CouponSystemException e) {
	// e.printExceptions();
	// }
	// return custf;
	// }

	/**
	 * This method checks if the client has a facade on its session, if so, purchases a new coupon for the customer.
	 * */
	@POST
	@Path("/purchasecoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response purchaseCoupon(Coupon coupon) {
		MyLogger.logging(Level.INFO, "purchaseCoupon started");

		// CustomerFacade custf = fakeLogin();
		CustomerFacade custf = getCustomerFacade();
		if (custf == null){
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			custf.purchaseCoupon(coupon);
			MyLogger.logging(Level.INFO, "purchaseCoupon finished successfuly");
			return Response.ok(coupon).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "purchaseCoupon failed");
			return Response.serverError().status(500).build();
		}
	}

	
	/**
	 * This method checks if the client has a facade on its session, if so, gets all coupons in the Coupon System.
	 * */
	@GET
	@Path("/getallcoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllCoupons() {
		MyLogger.logging(Level.INFO, "getAllCoupons started");

		// CustomerFacade custf = fakeLogin();
		CustomerFacade custf = getCustomerFacade();
		Collection<Coupon> coupons = null;
		if (custf == null){
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
			coupons = custf.getAllCoupons();
			GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons){};
			MyLogger.logging(Level.INFO, "getAllCoupons finished successfuly");
			return Response.ok(genericEntity).status(200).build();
		} catch (facadeException e) {
			MyLogger.logging(Level.WARNING, "getAllCoupons failed");
			return Response.serverError().status(500).build();
		}
	}

	/**
	 * This method checks if the client has a facade on its session, if so, gets all of the cusromer's coupons.
	 * */
	@GET
	@Path("/getallpurchasedcoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllPurchasedCoupons() {
		MyLogger.logging(Level.INFO, "getAllPurchasedCoupons started");

		// CustomerFacade custf = fakeLogin();
		CustomerFacade custf = getCustomerFacade();
		Collection<Coupon> coupons = null;

		if (custf == null){
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
				coupons = custf.getAllPurchasedCoupons();
				GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
				};
				MyLogger.logging(Level.INFO, "getAllPurchasedCoupons finished successfuly");
				return Response.ok(genericEntity).status(200).build();
			} catch (facadeException e) {
				MyLogger.logging(Level.WARNING, "getAllPurchasedCoupons failed");
				return Response.serverError().status(500).build();
			}
		}
		
	/**
	 * This method checks if the client has a facade on its session, if so, gets all of the customer's coupons of a certain type.
	 * */
	@GET
	@Path("/getcustomercouponsbytype/{couponType}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCustomerCouponsByType(@PathParam("couponType") String couponType) {
		MyLogger.logging(Level.INFO, "getCustomerCouponsByType started");

		CouponType type = CouponType.valueOf(couponType);
		// CustomerFacade custf = fakeLogin();
		CustomerFacade custf = getCustomerFacade();
		Collection<Coupon> coupons = null;
		if (custf == null){
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
			try {
				coupons = custf.getCustomerCouponsByType(type);
				GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
				};
				MyLogger.logging(Level.INFO, "getCustomerCouponsByType finished successfuly");
				return Response.ok(genericEntity).status(200).build();
			} catch (facadeException e) {
				MyLogger.logging(Level.WARNING, "getCustomerCouponsByType failed");
				return Response.serverError().status(500).build();
			}
		}

	/**
	 * This method checks if the client has a facade on its session, if so, gets all of the customer's coupons up to a certain price.
	 * */
	@GET
	@Path("/getcustomercouponsbyprice/{price}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCustomerCouponsByPrice(@PathParam("price") double price) {
		MyLogger.logging(Level.INFO, "getCustomerCouponsByPrice started");

		// CustomerFacade custf = fakeLogin();
		CustomerFacade custf = getCustomerFacade();
		Collection<Coupon> coupons = null;
		if (custf == null){
			MyLogger.logging(Level.WARNING, "No facade on session");
			return Response.serverError().status(440).build();
		}
		try {
				coupons = custf.getCustomerCouponsByPrice(price);
				GenericEntity<Collection<Coupon>> genericEntity = new GenericEntity<Collection<Coupon>>(coupons) {
				};
				MyLogger.logging(Level.INFO, "getCustomerCouponsByPrice finished successfuly");
				return Response.ok(genericEntity).status(200).build();
		
			} catch (facadeException e) {
				MyLogger.logging(Level.WARNING, "getCustomerCouponsByPrice failed");
				return Response.serverError().status(500).build();
			}
		}
}