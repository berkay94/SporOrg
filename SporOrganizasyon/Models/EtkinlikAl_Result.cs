//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SporOrganizasyon.Models
{
    using System;
    
    public partial class EtkinlikAl_Result
    {
        public int EtkinlikId { get; set; }
        public string EtkinlikAdi { get; set; }
        public string SporAdi { get; set; }
        public string Tip { get; set; }
        public Nullable<System.DateTime> EtkinlikTarihi { get; set; }
        public string MekanAdi { get; set; }
        public string Ad { get; set; }
        public string Sehir { get; set; }
        public Nullable<int> Kontenjan { get; set; }
        public Nullable<int> Katilanlar { get; set; }
    }
}
