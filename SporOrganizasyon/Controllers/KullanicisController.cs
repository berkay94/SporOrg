using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SporOrganizasyon.Models;

namespace SporOrganizasyon.Controllers
{
    public class KullanicisController : Controller
    {
        private SporOEntities db = new SporOEntities();

        // GET: Kullanicis
        public ActionResult Index()
        {
            var kullanicilar = db.Kullanici.ToList();
            return View(kullanicilar);
        }

        // GET: Kullanicis/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Kullanici kullanici = db.Kullanici.Find(id);
            if (kullanici == null)
            {
                return HttpNotFound();
            }
            return View(kullanici);
        }

        // GET: Kullanicis/Create
        public ActionResult Create()
        {
            var sporlar = db.Sporlar.ToList();
            return View(Tuple.Create<Kullanici, List<Sporlar>>(new Kullanici(), sporlar));
        }

        // POST: Kullanicis/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Item1")] Kullanici kullanici, int[]sporlar)
        {
            if (ModelState.IsValid)
            {
                List<Sporlar> Sporlar = new List<Sporlar>();
                foreach (var item in sporlar)
                {
                    var kullanicispor = from spor in db.Sporlar where spor.SporId == item select spor;
                    Sporlar.Add(kullanicispor.Single());
                }
                kullanici.Sporlar = Sporlar;
                db.Kullanici.Add(kullanici);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(kullanici);
        }

        // GET: Kullanicis/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Kullanici kullanici = db.Kullanici.Find(id);
            if (kullanici == null)
            {
                return HttpNotFound();
            }
            return View(kullanici);
        }

        // POST: Kullanicis/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Kid,Ad,Soyad,Email,Telefon,Sifre,Ilce,DogumTarihi,Cinsiyet,isLogin")] Kullanici kullanici)
        {
            if (ModelState.IsValid)
            {
                db.Entry(kullanici).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(kullanici);
        }

        // GET: Kullanicis/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Kullanici kullanici = db.Kullanici.Find(id);
            if (kullanici == null)
            {
                return HttpNotFound();
            }
            return View(kullanici);
        }

        // POST: Kullanicis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Kullanici kullanici = db.Kullanici.Find(id);
            db.Kullanici.Remove(kullanici);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult GirisYap()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GirisYap(Kullanici k)
        {
            try
            {

                var kullanici = db.Kullanici.Single(x => x.Email == k.Email && x.Sifre == k.Sifre);
                if(kullanici!=null)
                {
                    Session["Kid"] = kullanici.Kid.ToString();
                    Session["Email"] = kullanici.Email.ToString();
                    return RedirectToAction("AnaSayfa");
                }

            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Email veya sifre hatali");
            }
            return View();
        }

        public ActionResult AnaSayfa()
        {
            if (Session["Kid"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("GirisYap");
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
