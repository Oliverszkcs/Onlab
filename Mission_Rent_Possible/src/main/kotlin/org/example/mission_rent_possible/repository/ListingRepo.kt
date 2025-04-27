package org.example.mission_rent_possible.repository


import org.example.mission_rent_possible.model.Listing
import org.example.mission_rent_possible.model.propertyType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ListingRepo: JpaRepository<Listing, Long> {

    @Query("""

    SELECT l
    FROM listing l
    WHERE 
      (:price IS NULL OR l.targetPrice >= :price) OR
      (:bathrooms IS NULL OR l.property.bathroomNumber >= :bathrooms) OR
      (:bedrooms IS NULL OR l.property.bedroomNumber >= :bedrooms) OR
      (:minimumArea IS NULL OR l.property.minimumArea >= :minimumArea) OR
      (:furnished IS NULL OR l.property.furnished = :furnished) OR
      (:type IS NULL OR l.property.type = :type) OR
      (:city IS NULL OR LOWER(l.property.location) LIKE LOWER(CONCAT('%', :city, '%')))
    ORDER BY
      CASE WHEN :price IS NOT NULL AND l.targetPrice >= :price THEN 1 ELSE 0 END +
      CASE WHEN :bathrooms IS NOT NULL AND l.property.bathroomNumber >= :bathrooms THEN 1 ELSE 0 END +
      CASE WHEN :bedrooms IS NOT NULL AND l.property.bedroomNumber >= :bedrooms THEN 1 ELSE 0 END +
      CASE WHEN :minimumArea IS NOT NULL AND l.property.minimumArea >= :minimumArea THEN 1 ELSE 0 END +
      CASE WHEN :furnished IS NOT NULL AND l.property.furnished = :furnished THEN 1 ELSE 0 END +
      CASE WHEN :type IS NOT NULL AND l.property.type = :type THEN 1 ELSE 0 END +
      CASE WHEN :city IS NOT NULL AND LOWER(l.property.location) LIKE LOWER(CONCAT('%', :city, '%')) THEN 1 ELSE 0 END
    DESC
""")
    fun findAllFilteredListings(
        city: String?,
        price: Double?,
        bedrooms: Int?,
        bathrooms: Int?,
        minimumArea: Int?,
        furnished: Boolean?,
        type: propertyType?
    ): List<Listing>

}