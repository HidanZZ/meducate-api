import { MedFr1 } from '@/models/med_fr1';
import { MedFr2 } from '@/models/med_fr2';
import { MedFr3 } from '@/models/med_fr3';
import { MedFr4 } from '@/models/med_fr4';
import { MedFr5 } from '@/models/med_fr5';
import { MedFr6 } from '@/models/med_fr6';
import { MedFr7 } from '@/models/med_fr7';
import { MedFr8 } from '@/models/med_fr8';
import { MedFr } from '@/models/med_fr';

export const medFrService = {
  
  getMedicamentByDenomination: async (nomDuMedicament: string) => {
    try {
      let medicament = new MedFr();
      let med2 = await MedFr2.findOne({ denomination: 
        { $regex: `${nomDuMedicament}`, $options: 'i' } });
      let med1, med4, med3, med5, med6, med7, med8;
      if(med2){
        med1= await MedFr1.findOne({ cis_code: med2.cis_code });
        med3= await MedFr3.findOne({ cis_code: med2.cis_code });
        med4= await MedFr4.findOne({ cis_code: med2.cis_code });
        med5= await MedFr5.findOne({ cis_code: med2.cis_code });
        med6= await MedFr6.findOne({ cis_code: med2.cis_code });
        med7= await MedFr7.findOne({ cis_code: med2.cis_code });
        
        medicament._id = med2._id;
        medicament.cis_code = med2.cis_code;
        medicament.denomination = med2.denomination;
        medicament.forme_pharmaceutique = med2.forme_pharmaceutique;
        medicament.voies_administration = med2.voies_administration;
        medicament.statut_amm = med2.statut_amm;
        medicament.type_procedure_amm = med2.type_procedure_amm;
        medicament.etat_commercialisation = med2.etat_commercialisation;
        medicament.titulaires= med2.titulaires; 
      }
      if(med1){
        medicament.libelle_presentation = med1.libelle_presentation;
        medicament.prix_medicament = med1.prix_medicament;
      }
      if(med3){
        medicament.condition_prescription = med3.condition_prescription;
      }
      if(med4){
        medicament.libelle_groupe_generique = med4.libelle_groupe_generique;
      }
      if(med7){
        medicament.texte_info_secu = med7.texte_info_secu;
        medicament.date_debut_info_secu = med7.date_debut_info_secu;
        
      }
      if(med6){
        med8 = await MedFr8.findOne({ dossier_has_code : med6.dossier_has_code });
        medicament.dossier_has_code = med6.dossier_has_code;
        if(med8){
          medicament.lien_avis_ct = med8.lien_avis_ct;
        }
      }
    
      console.log(medicament);
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by denomination');
    }
  },

  getMedicamentById: async (_id: string) => {
    try {
      let medicament = new MedFr();
      
      let med2 = await MedFr2.findById({ _id : _id});
      let med1, med4, med3, med5, med6, med7, med8;
      if(med2){
        med1= await MedFr1.findOne({ cis_code: med2.cis_code });
        med3= await MedFr3.findOne({ cis_code: med2.cis_code });
        med4= await MedFr4.findOne({ cis_code: med2.cis_code });
        med5= await MedFr5.findOne({ cis_code: med2.cis_code });
        med6= await MedFr6.findOne({ cis_code: med2.cis_code });
        med7= await MedFr7.findOne({ cis_code: med2.cis_code });
        
        medicament._id = med2._id;
        medicament.cis_code = med2.cis_code;
        medicament.denomination = med2.denomination;
        medicament.forme_pharmaceutique = med2.forme_pharmaceutique;
        medicament.voies_administration = med2.voies_administration;
        medicament.statut_amm = med2.statut_amm;
        medicament.type_procedure_amm = med2.type_procedure_amm;
        medicament.etat_commercialisation = med2.etat_commercialisation;
        medicament.titulaires= med2.titulaires; 
      }
      if(med1){
        medicament.libelle_presentation = med1.libelle_presentation;
        medicament.prix_medicament = med1.prix_medicament;
        medicament.taux_remboursement = med1.taux_remboursement;
      }
      if(med3){
        medicament.condition_prescription = med3.condition_prescription;
      }
      if(med4){
        medicament.libelle_groupe_generique = med4.libelle_groupe_generique;
      }
      if(med7){
        medicament.texte_info_secu = med7.texte_info_secu;
      }
      if(med6){
        med8 = await MedFr8.findOne({ dossier_has_code : med6.dossier_has_code });
        medicament.dossier_has_code = med6.dossier_has_code;
        if(med8){
          medicament.lien_avis_ct = med8.lien_avis_ct;
        }
      }
      console.log(medicament);
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by denomination');
    }
  },
  
}

  



